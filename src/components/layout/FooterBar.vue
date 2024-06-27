<script setup>

import PLayerCover from "@/components/commons/PLayerCover.vue";
import {playStore} from "@/store/playStore.js";
import ControlBar from "@/components/commons/ControlBar.vue";
import {onMounted,computed,ref,watch} from "vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import ControlSlider from "@/components/commons/ControlSlider.vue";
import emitter from '@/utils/MittBus.js'

const playingInfo = playStore().playingInfo

const playS = playStore()

const volume = ref(0)

const volBeforeMute = ref(0)

onMounted(() =>{
  volume.value = playingInfo.volume
})

watch(volume, (val) =>{
  playS.updateVolume(val)
})

watch(()=>playingInfo.mute, val =>{
  if(!val){
    volume.value  = volBeforeMute.value
  }else{
    volume.value = 0
  }
})

const iconName = computed(()=>{
  if(volume.value === 0 || playingInfo.mute){
    return 'volume-mute'
  }
  if(volume.value <= 50){
    return 'volume-small'
  }
  return 'volume-notice'
})

const triggerMute = () =>{
  if(!playingInfo.mute){ //切换到静音前保存音量
    volBeforeMute.value = volume.value
  }
  playS.triggerMute()
}

const changeVolume = (val) =>{
  volume.value = val
  playingInfo.mute = false
}
</script>

<template>
  <div class="player-bar">
    <div class="left-area">
      <PLayerCover :playing-info="playingInfo"></PLayerCover>
    </div>

    <div class="middle-area">
      <ControlBar></ControlBar>
    </div>

    <div class="right-area">
      <div class="volume-wrapper pointer" @click.stop="triggerMute">
        <svg-icon :name="iconName" class-name="font-24" vertical="-0.3"></svg-icon>
        <div class="volume-slider-wrapper">
          <control-slider v-model="volume" :vertical="true" :size="100" @progress-change="changeVolume"></control-slider>
        </div>
      </div>
      <div class="playlist-btn pointer" @click.stop="emitter.emit('triggerPlaylistDrawer')">
        <svg-icon name="music-list" class-name="font-24" vertical="-0.3"></svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";
.player-bar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  transition: all 0.5s;

  .left-area {
    position: relative;
    height: 80px;
    width: 280px;
    overflow: hidden;
  }

  .middle-area {
    width: 440px;
    height: 80px;
  }

  .right-area {
    width: 280px;
    height: 80px;
    display: flex;
    padding-left: 160px;

    .volume-wrapper{
      height: 36px;
      width: 36px;
      margin-top: auto;
      margin-bottom: auto;
      position: relative;
      line-height: 36px;
      text-align: center;
      color: black;

      .volume-slider-wrapper{
        padding: 5px 0;
        position: absolute;
        bottom: 36px;
        border: 1px solid @greyD8;
        border-radius: 5px;
        background-color: #fff;
        display: none;
        z-index: 199;
      }
      &:hover .volume-slider-wrapper{
        display: block;
      }
    }

    .playlist-btn{
      height: 36px;
      width: 36px;
      line-height: 36px;
      text-align: center;
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 10px;
    }
  }
}
</style>