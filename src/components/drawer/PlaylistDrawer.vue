<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import {playStore} from "@/store/playStore.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import MusicList from "@/components/list/MusicList.vue";
import emitter from '@/utils/MittBus.js'

const open = ref(false)

const playlist = playStore().playlist

const config = ref([
  {width: '25px', flexShrink: 0, fontSize: '12px'}, //顺序
  {display: 'none'}, // 操作
  {width: '680px', flexShrink: 1, fontSize: '12px'}, //歌名
  {width: '320px', flexShrink: 1, fontSize: '12px'}, //歌手
  {display: 'none'},// 专辑
  {width: '132px', flexShrink: 1, fontSize: '12px'},// 时长
])

onUnmounted(() => {
  emitter.off('triggerPlaylistDrawer')
})

onMounted(() => {
  emitter.on('triggerPlaylistDrawer', () => {
    open.value = !open.value
  })
})

const playMusic = (id) => {
  emitter.emit('playMusic', id)
}

const playS = playStore()
</script>

<template>
  <el-drawer v-model="open"
             direction="rtl"
             :size="500"
             :with-header="false"
             :z-index="99">
    <div class="title-wrapper font-20">当前播放</div>
    <div class="btn-wrapper">
      <div class="grey-color font-12">总{{ playlist.length }}首</div>
      <div class="collect-wrapper dark-color">
        <svg-icon name="collection-records" class-name="font-18" vertical="-0.25"></svg-icon>
        收藏全部
      </div>
      <div class="pointer clear-all" @click.stop="playS.clearPlaylist">
        清空列表
      </div>
    </div>
    <music-list :data-list="playlist"
                pl="5px"
                :show-title="false"
                :style-cfg="config"
                @click-item="playMusic"></music-list>
  </el-drawer>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.title-wrapper {
  margin: 20px;
  font-weight: 600;
}

.btn-wrapper {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid @greyD8;
}

.collect-wrapper {
  margin-left: auto;
}

.clear-all {
  margin-left: 20px;
  color: @clearBlue
}
</style>