<script setup>

import {toCNNum} from "@/utils/FormatUtil.js";
import {useRouter} from "vue-router";

/**
 * 搜索页推荐banner歌手
 * @type {Prettify<Readonly<ExtractPropTypes<{data: {require: boolean, type: ObjectConstructor}}>>>}
 */
const props = defineProps({
  data: {
    type: Object,
    require: true
  }
})
const router = useRouter()

const toArtistDetail = () =>{
  router.push({
    name:'ArtistDetail',
    query:{id : props.data.id}
  })
}
</script>

<template>
  <div @click="toArtistDetail" class="pointer banner-content">
    <img v-lazy="data.picUrl + '?param=100y100'" alt="">
    <div class="banner-info">
      <div class="text-hidden">歌手: {{ data.name }} <span v-if="data.trans" class="grey-color">({{data.trans}})</span></div>
      <div class="text-hidden grey-color font-12">粉丝: {{ toCNNum(data.fansSize) }}，歌曲{{ toCNNum(data.musicSize) }}</div>
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
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 40px;
    border-radius: 50%;
  }

  .banner-info {
    width: 260px;
    margin-left: 10px;
  }
}
</style>