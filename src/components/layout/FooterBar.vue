<script setup>

import PLayerCover from "@/components/commons/PLayerCover.vue";
import {playStore} from "@/store/playStore.js";
import ControlBar from "@/components/commons/ControlBar.vue";

const playingInfo = playStore().playingInfo

</script>

<template>
  <div class="player-bar">
    <div class="left-area">
      <PLayerCover :playing-info="playingInfo"></PLayerCover>
    </div>

    <div class="middle-area">
      <ControlBar></ControlBar>
    </div>

    <div class="right-area"></div>
  </div>
</template>

<style scoped lang="less">
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
  }
}
</style>