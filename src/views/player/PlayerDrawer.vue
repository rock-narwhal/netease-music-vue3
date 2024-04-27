<script setup>
import {ref, onMounted, onUnmounted, computed} from "vue";
import {playStore} from "@/store/playStore.js";

const player = playStore().player
const playingInfo = playStore().playingInfo

const bgStyle = computed(()=>{
  return {
    backgroundImage : `url('${playingInfo.coverUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(200px)',
    opacity: '0.2'
  }
})
</script>

<template>
  <el-drawer v-model="player.open"
             direction="btt"
             size="100%"
             :with-header="false"
             :z-index="90">
    <div class="player-wrapper" :style="bgStyle">

    </div>
  </el-drawer>
</template>

<style scoped lang="less">
.full-height-drawer .el-drawer__container {
  height: 100%;
}
.player-wrapper{
  height: 100%;
  width: 100%;
}
</style>