<script setup>
import {getLyric} from "@/api/api_music.js";
import {parseLyric} from "@/utils/LyricUtil.js";
import {onMounted, ref, onBeforeUnmount, watch} from "vue";
import {playStore} from "@/store/playStore.js";
import mitt from "@/utils/MittBus.js";


// 当前播放到哪句歌词
const curIdx = ref(0)
const lyricArr = ref([])
const draw = ref(false) // 手动拖动

const playingInfo = playStore().playingInfo

const updateLyric = async () => {
  if (lyricArr.value.length !== 0) return
  if (playingInfo.id === 0) return
  const res = await getLyric(playingInfo.id)
  if (res.code !== 200) return
  playingInfo.lyric = res.lrc.lyric
  if (playingInfo.lyric) {
    lyricArr.value = parseLyric(playingInfo.lyric)
  }
}

watch(() => playingInfo.id, () => {
  curIdx.value = 0
  lyricArr.value = []
  if(lyricRef.value){
    lyricRef.value.scrollTop = 0
  }
  updateLyric()
})

const lyricRef = ref(null)
watch(() => playingInfo.current, (val) => {
  if (!playingInfo.id || lyricArr.value.length === 0) return
  scrollLyric(val * 1000)
})

const scrollLyric = (time) => {
  if (lyricArr.value.length === 0) return
  if (draw.value) return
  let ind = 0
  for (let i = 0; i < lyricArr.value.length; i++) {
    if (i === lyricArr.value.length - 1) {
      ind = i
    } else {
      if (lyricArr.value[i].time <= time && lyricArr.value[i + 1].time > time) {
        ind = i
        break
      }
    }
  }
  // 平滑滚动到div中间
  // if(lyricRef.value && lyricRef.value.length > 0 && lyricRef.value[curIdx.value] && lyricRef.value[curIdx.value].scrollIntoView){
  //   lyricRef.value[curIdx.value].scrollIntoView({behavior: 'smooth', block: 'center'})
  // }
  if(ind === curIdx.value) return
  curIdx.value = ind
  scroll(curIdx.value)
}
const wrapRef = ref(null)

const scroll = (index) =>{
  if(lyricRef.value.length === 0) return
  let hw = wrapRef.value.offsetHeight / 2 //歌词容器高度的一半

  let ch = 0  //歌词内容到index的高度
  for(let i=0;i<= index; i++){
    if(i === index){
      ch += lyricRef.value[i].offsetHeight / 2
    }else{
      ch += lyricRef.value[i].offsetHeight
    }
  }
  if(ch > hw){
    wrapRef.value.scrollTop = ch - hw
  }
}

onMounted(async () => {
  mitt.on('doUpdateLyric', updateLyric)
  await updateLyric()
  scrollLyric(playingInfo.current * 1000)
})

onBeforeUnmount(() => {
  mitt.off('doUpdateLyric')
})

let timer = 0
const doDraw = () =>{
  window.clearTimeout(timer)
  draw.value = true
  window.setTimeout(()=> {
    draw.value = false
    scroll(curIdx.value)
  }, 5000)
}

</script>

<template>
  <div class="lyric-wrap" @wheel="doDraw" ref="wrapRef">
    <div v-for="(item,index) in lyricArr"
         :key="item.time"
         :class="{active: index === curIdx}"
         ref="lyricRef"
         class="lyric-line">
      {{ item.content }}
    </div>
  </div>
</template>

<style scoped lang="less">
.lyric-wrap{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  transition: all 1.5s;

  .lyric-line{
    font-size: 14px;
    color: #969896;
    padding: 10px 5px;
    line-height: 20px;
  }
  .active{
    font-size: 18px;
    color: #000;
    font-weight: bolder;
  }
}
</style>