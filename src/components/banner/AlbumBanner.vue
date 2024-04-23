<script setup>
import {useRouter} from "vue-router";

/**
 * 搜索页推荐banner专辑
 * @type {Prettify<Readonly<ExtractPropTypes<{data: {require: boolean, type: ObjectConstructor}}>>>}
 */
const props = defineProps({
  data: {
    type: Object,
    require: true
  }
})

const router = useRouter()
const toAlbumDetail = ()=>{
  router.push({
    name:'AlbumDetail',
    query:{id : props.data.id}
  })
}
</script>

<template>
  <div @click="toAlbumDetail" class="pointer banner-content">
    <img v-lazy="data.picUrl + '?param=100y100'" alt="">
    <div class="banner-info">
      <div class="text-hidden">专辑: {{ data.name }} </div>
      <div class="text-hidden grey-color font-12">{{data.artist.name}}</div>
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
  }

  .banner-info {
    width: 260px;
    margin-left: 10px;
  }
}
</style>