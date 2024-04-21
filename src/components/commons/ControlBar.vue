<script setup>
import {ref, reactive, computed, onMounted, watch, nextTick, onUnmounted} from 'vue'
import ControlSlider from "@/components/commons/ControlSlider.vue";
import {timeConvert} from "@/utils/DateUtil.js";
import emitter from '@/utils/MittBus.js'
import {playStore} from "@/store/playStore.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import {getSongUrl, songDetail} from "@/api/api_music.js";
import {ElMessage} from "element-plus";

const mode = ref(0) // 播放模式  0循环播放，1单曲循环，2随机播放，3列表循环
const playModeIcons = reactive(['play-loop', 'play-single', 'play-random', 'play-order'])
const playModeIcon = computed(() => {
  return playModeIcons[mode.value]
})

const progress = ref(0)
const audioRef = ref(null)

const changeProgress = (val) => {
  if (!playingInfo.id) return
  let current = Math.floor(playingInfo.duration * val / 100000)
  if (playingInfo.current === current) return
  audioRef.value.currentTime = current
  playS.updateCurrent(current)
}

const playOrPause = () => {
  if (!playingInfo.src) {
    playS.updatePlaying(false)
  } else {
    playS.updatePlaying(!playingInfo.playing)
  }
}

const switchMode = () => {
  mode.value = (mode.value + 1) % 4
}
// 根据不同播放模式有不同策略
const playFinish = async () => {
  playS.updatePlaying(false)
  let next
  if (mode.value === 0) { //
    next = playS.getNext
  } else if (mode.value === 1) { //单曲循环
    audioRef.value.currentTime = 0
    updateCurrent()
    playS.updatePlaying(true)
    return
  } else if (mode.value === 2) { //随机播放
    next = playS.getRandom
  } else { //列表循环
    next = playS.getNextInList
  }
  if (next) {
    await getSrcAndPlay(next)
  }
}
// 查询歌曲src并播放
const getSrcAndPlay = async (song) => {
  await getSongData(song.id)
  if (songData.value.length > 0) {
    song.src = songData.value[0].url
    song.data = songData.value
  } else {
    window.setTimeout(() => {
      playFinish()
    }, 3000)
    return
  }
  song.playing = false
  playS.updatePlayingInfo(song)
  await nextTick(() => {
    progress.value = 0
    playS.updatePlaying(true)
  })
}
// flag:1 播放下一首  flag:-1 播放上一首
const playNext = async (flag) => {
  let next
  if (mode.value === 2) {
    next = playS.getRandom
  } else {
    if (flag === 1) {
      next = playS.getNext
    } else {
      next = playS.getPre
    }
  }
  if (next) {
    await getSrcAndPlay(next)
  }
}

const updateCurrent = () => {
  if (!audioRef.value) {
    console.log('updateCurrent audioRef 有问题？？？')
    return
  }
  let second = Math.floor(audioRef.value.currentTime)
  if (playingInfo.current === second) return
  playS.updateCurrent(second)
  progress.value = Math.floor(second * 100000 / playingInfo.duration)
}

const playS = playStore()

const playingInfo = playS.playingInfo

// const playList = playS.playlist
// 播放音乐
const playMusic = async (id) => {
  if (playingInfo.id === id) {
    if (!playingInfo.playing) {
      playS.updatePlaying(true)
    }
  } else { // 切换歌曲
    playS.updatePlaying(false)
    let s = playS.getSongById(id);
    if (s && s.length) {
      s[0].current = 0
      await getSrcAndPlay(s[0])
      return
    }

    let res = await songDetail(id)
    if (res.code !== 200 || res.songs.length === 0) return
    let song = res.songs[0]
    await getSrcAndPlay({
      id: song.id,
      duration: song.dt,
      current: 0,
      name: song.name,
      coverUrl: song.al.picUrl,
      album: song.al,
      artists: song.ar,
    })
  }
}

let songData = ref([])
const getSongData = async (id) => {
  const res = await getSongUrl(id)
  if (res.code !== 200) {
    songData.value = []
    return
  }
  if (!res.data || res.data.length === 0) {
    songData.value = []
    ElMessage("当前歌曲暂无音源")
    return null
  }
  songData.value = res.data
}

watch(() => playingInfo.playing, val => {
  if (playingInfo.src) {
    if (val) {
      doPlayMusic()
    } else {
      doPause()
    }
  }
})

watch(() => playingInfo.src, val => {
  if (val && audioRef.value) {
    audioRef.value.load()
  }
})

watch(() => playingInfo.volume, val => {
  if(audioRef.value){
    audioRef.value.volume = val / 100
  }
})

watch(() => playingInfo.mute, val =>{
  if(!val){
    audioRef.value.volume = playingInfo.volume / 100
  }else{
    audioRef.value.volume = 0
  }
})
const doPlayMusic = () => {
  if (!playingInfo.src) return
  if (!audioRef.value.play) {
    console.log('audioRef 有问题？？？')
    return
  }

  audioRef.value.play().catch(e => {
    ElMessage('播放错误！')
    playS.updatePlaying(false)
    console.log(e)
    setTimeout(()=>{
      playFinish()
    }, 3000)
  })
  // }
}

const doPause = () => {
  if (!audioRef.value.pause) {
    console.log('audioRef 有问题？？？')
    return
  }
  audioRef.value.pause()
}

const playAll = (list) => {

}

onMounted(() => {
  playS.updatePlaying(false)
  if (playingInfo.src && playingInfo.id && playingInfo.current > 0) {
    progress.value = Math.floor(playingInfo.current * 100000 / playingInfo.duration)
    if (audioRef.value) {
      audioRef.value.volume = playingInfo.volume / 100
      audioRef.value.load()
      audioRef.value.currentTime = playingInfo.current
    }
  } else {
    playS.updateCurrent(0)
  }
  emitter.on('playMusic', playMusic)
  emitter.on('playAll', playAll)
})

onUnmounted(() => {
  emitter.off('playMusic')
  emitter.off('playAll')
})
</script>

<template>
  <div class="control-bar clearfix">
    <div class="control-btn">
      <button class="ctl-btn pointer" @click="switchMode">
        <svg-icon :name="playModeIcon"></svg-icon>
      </button>
      <button class="ctl-btn pointer" @click.stop="playNext(-1)">
        <svg-icon name="play-pre" class-name="font-16" vertical="-0.15"></svg-icon>
      </button>
      <button class="pause-btn" @click="playOrPause">
        <svg-icon name="pause" class-name="font-22" vertical="-0.25" v-if="playingInfo.playing"></svg-icon>
        <svg-icon name="play-fill" class-name="font-22" vertical="-0.25" v-else></svg-icon>
      </button>
      <button class="ctl-btn pointer" @click.stop="playNext(1)">
        <svg-icon name="play-next" class-name="font-16" vertical="-0.15"></svg-icon>
      </button>
      <button class="ctl-btn pointer" style="vertical-align: 0.1em">词</button>
    </div>
    <div class="progress-bar">
      <span class="font-12">{{ timeConvert(playingInfo.current) }}</span>
      <ControlSlider :size="360" v-model="progress" class="time-slider"
                     @progressChange="changeProgress"></ControlSlider>
      <span class="font-12">{{ timeConvert(playingInfo.duration / 1000) }}</span>
    </div>

    <audio :src="playingInfo.src" ref="audioRef" @ended="playFinish" @timeupdate="updateCurrent">
    </audio>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.control-bar {
  width: 100%;
  height: 100%;

  .control-btn {
    width: 250px;
    margin: 10px auto 0;

    button {
      margin: 0 10px;
    }

    .pause-btn {
      height: 34px;
      width: 34px;
      border-radius: 50%;
      border: none;
      background-color: @listBg;

      &:hover {
        background-color: @listHover;
      }
    }
  }

  .progress-bar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 36px;

    span {
      line-height: 36px;
      color: #999999;
    }
  }
}
</style>