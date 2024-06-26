<script setup>
import {getLyric} from "@/api/api_music.js";
import {parseLyric} from "@/utils/LyricUtil.js";
import {onMounted, ref, onBeforeUnmount, watch} from "vue";
import {playStore} from "@/store/playStore.js";
import mitt from "@/utils/MittBus.js";


// 当前播放到哪句歌词
const curIdx = ref(0)
const lyricArr = ref([])
const draw = ref(false) // 手动拖动？？

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
  index.value = 0
  lyricArr.value = []
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
  for (let i = 0; i < lyricArr.value.length; i++) {
    if (i === lyricArr.value.length - 1) {
      curIdx.value = i
    } else {
      if (lyricArr.value[i].time <= time && lyricArr.value[i + 1].time > time) {
        curIdx.value = i
        break
      }
    }
  }
  // 平滑滚动到div中间
  lyricRef.value[curIdx.value].scrollIntoView({behavior: 'smooth', block: 'center'})
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
  window.setTimeout(()=> draw.value = false, 10000)
}

</script>

<template>
  <div class="lyric-wrapper" @wheel="doDraw">
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
.lyric-wrapper{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .lyric-line{
    font-size: 14px;
    color: #969896;
    padding: 10px 5px;
    line-height: 20px;
  }
  .active{
    font-size: 18px;
    color: #000;
  }
}
</style>