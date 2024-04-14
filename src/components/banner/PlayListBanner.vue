<script setup>
import {defineProps} from 'vue'
import {toCNNum} from "@/utils/FormatUtil.js";
import {useRouter} from "vue-router";

defineProps({
  playlist: {
    type: Object,
    require: true
  }
})

const router = useRouter()
const clickPlayList = (id)=>{
  router.push({
    name:'PlaylistDetail',
    query:{id}
  })
}
</script>

<template>
  <div @click="clickPlayList" class="pointer banner-content" v-if="playlist">
    <img v-lazy="playlist.coverImgUrl + '?param=100y100'" alt="">
    <div class="banner-info">
      <div style="text-overflow: ellipsis">歌单: {{ playlist.name }}</div>
      <div>歌曲:{{ playlist.trackCount }}，播放{{ toCNNum(playlist.playCount) }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.banner-content {
  width: 320px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: @btnGreyHover;

  img {
    width: 50px;
    border-radius: 50%;
  }

  .banner-info {
    margin-left: 10px;
  }
}
</style>