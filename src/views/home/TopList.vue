<script setup>
import {ref, onMounted, computed} from 'vue'
import {getTopList} from "@/api/api_toplist.js";
import {useRouter} from "vue-router";
import ImgList from '@/components/list/ImgList.vue'
import TopListBanner from "@/components/banner/TopListBanner.vue";

const topList = ref([])
onMounted(async () => {
  const res = await getTopList()
  if (res.code !== 200) return
  topList.value = res.list.slice(0, 39)
})

const officialTopList = computed(() => {
  if (topList.value.length >= 5) {
    return topList.value.slice(0, 4)
  }
  return topList.value
})

const globalTopList = computed(() => {
  if (topList.value.length > 5) {
    return topList.value.slice(4)
  }
  return topList.value
})
// 播放歌单
const clickPlay = (id) => {

}

const router = useRouter()
const toListDetail = (id) => {
  router.push({
    name: 'PlaylistDetail',
    query: {id}
  })
}
</script>

<template>
  <!--  排行榜页面-->
  <div class="container">
    <div class="list-title">官方榜</div>
    <TopListBanner
        @viewMore="toListDetail"
        @clickPlay="clickPlay"
        :list="officialTopList"></TopListBanner>
    <div class="list-title">全球榜</div>
    <ImgList type="playlist"
             :list="globalTopList"
             @clickPlay="clickPlay"
             @clickImg="toListDetail">
      <template v-slot="{item}">
        {{ item.name }}
      </template>
    </ImgList>
  </div>
</template>

<style scoped>
.container {
  .list-title {
    margin: 20px 0;
    font-size: 20px;
    font-weight: bolder;
  }
}
</style>