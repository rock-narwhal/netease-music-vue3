<script setup>
import {ref, reactive, defineProps, defineEmits, computed, onMounted} from 'vue'
import ControlSlider from "@/components/commons/ControlSlider.vue";
import {timeConvert} from "@/utils/DateUtil.js";
import emitter from '@/utils/MittBus.js'
import {playStore} from "@/store/playStore.js";

defineProps({
  playingInfo: {
    required: true,
    type: Object
  }
})

const mode = ref(0) // 播放模式  0循环播放，1单曲循环，2随机播放，3列表循环
const playModeIcons = reactive(['icon-xunhuanbofang', 'icon-danquxunhuan1', 'icon-suijibofang1', 'icon-liebiaoshunxu'])
const playModeIcon = computed(() => {
  return playModeIcons[mode.value]
})

const progress = ref(0)

const emit = defineEmits(['onChange', 'clickPlay'])
const changeProgress = (val) => {
  emit('onChange', val)
}

const playOrPause = () => {
  emit('clickPlay')
}

const switchMode = () => {
  mode.value = (mode.value + 1) % 4
}

const playFinish = () => {
}

const updateCurrent = () => {

}

const playingInfo = playStore().playingInfo

const playList = playStore().playlist
const doPlayMusic = (song) => {
  if(playingInfo.songId === song.id){
    if(!playingInfo.playing){
      playingInfo.playing = true
    }
  }else{ // 切换歌曲

  }
}

onMounted(() => {
  emitter.on('playMusic', doPlayMusic)
})
</script>

<template>
  <div class="control-bar clearfix">
    <div class="ctl-btn">
      <button class="no-btn pointer" @click="switchMode">
        <i class="iconfont" :class="playModeIcon"></i>
      </button>
      <button class="no-btn pointer">
        <i class="iconfont icon-shangyishou"></i>
      </button>
      <button class="pause-btn" @click="playOrPause">
        <i class="iconfont icon-zanting" v-if="playingInfo.playing"></i>
        <i class="iconfont icon-bofang" v-else></i>
      </button>
      <button class="no-btn pointer">
        <i class="iconfont icon-xiayishou"></i>
      </button>
      <button class="no-btn pointer">词</button>
    </div>
    <div class="progress-bar">
      <span class="font-12">{{ timeConvert(playingInfo.current) }}</span>
      <ControlSlider :size="360" v-model="progress" class="time-slider" @onChange="changeProgress"></ControlSlider>
      <span class="font-12">{{ timeConvert(playingInfo.duration / 1000) }}</span>
    </div>

    <audio :src="playingInfo.src" ref="audioRef" autoplay @ended="playFinish" @timeupdate="updateCurrent">
    </audio>
  </div>
</template>

<style scoped lang="less">
.control-bar {
  width: 100%;
  height: 100%;

  .ctl-btn {
    width: 250px;
    margin: 10px auto 0;

    button {
      margin: 0 10px;

      &.pause-btn {
        height: 34px;
        width: 34px;
        border-radius: 50%;
        border: none;
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