<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import {cloudSearch} from "@/api/api_music.js";
import MusicList from "@/components/list/MusicList.vue";

const isLoading = ref(false)
const pageInfo = ref({
  current: 1,
  total: 0,
})

const queryInfo = ref({
  offset: 0,
  limit: 50,
  type: 1,//单曲
  keywords: '',
})

const route = useRoute()

const songList = ref([])
onMounted(() => {
  let keywords = decodeURI(route.query.keywords)
  queryInfo.value.keywords = keywords.replaceAll(/\s+/g, '+')
  doSearch()
})

watch(() => route.query, (val) => {
  let keywords = decodeURI(val.keywords)
  queryInfo.value.keywords = keywords.replaceAll(/\s+/g, '+')
  doSearch()
})

const doSearch = async () => {
  isLoading.value = true
  const res = await cloudSearch(queryInfo.value)
  if (res.code !== 200) return
  songList.value = res.result.songs
  pageInfo.value.total = res.result.songCount
  isLoading.value = false
}

const playMusic = (song) => {

}

</script>

<template>
  <div>
    <!--  搜索 单曲页面  {{$route.query}}-->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :data-list="songList" :dbClick="playMusic"></MusicList>
  </div>
</template>

<style scoped lang="less">

</style>