<script setup>
import {toCNNum} from "@/utils/FormatUtil.js";
import {useRouter} from "vue-router";

/**
 * 搜索页推荐banner歌单
 * @type {Prettify<Readonly<ExtractPropTypes<{data: {require: boolean, type: ObjectConstructor}}>>>}
 */
const props = defineProps({
  data: {
    type: Object,
    require: true
  }
})

const router = useRouter()
const clickPlayList = ()=>{
  router.push({
    name:'PlaylistDetail',
    query:{id : props.data.id}
  })
}
</script>

<template>
  <div @click="clickPlayList" class="pointer banner-content">
    <img v-lazy="data.coverImgUrl + '?param=100y100'" alt="">
    <div class="banner-info">
      <div class="text-hidden">歌单: {{ data.name }}</div>
      <div class="text-hidden grey-color font-12">歌曲: {{ data.trackCount }}，播放{{ toCNNum(data.playCount) }}</div>
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
    width: 40px;
    border-radius: 3px;
  }

  .banner-info {
    width: 250px;
    margin-left: 10px;
  }
}
</style>