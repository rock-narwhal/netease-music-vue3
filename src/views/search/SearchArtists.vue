<script setup>
import {ref, onMounted, reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {cloudSearch} from "@/api/api_music.js";
import ImgWidthList from "@/components/list/ImgWidthList.vue";

const isLoading = ref(false)

const pageInfo = reactive({
  current: 1,
  total: 0,
})

const queryInfo = reactive({
  offset: 0,
  limit: 50,
  type: 100,//歌手
  keywords: '',
})

const list = ref([])

const route = useRoute()
onMounted(async () => {
  let keywords = decodeURI(route.query.keywords)
  queryInfo.keywords = keywords.replaceAll(/\s+/g, '+')

  isLoading.value = true
  const res = await cloudSearch(queryInfo)
  if (res.code !== 200) return
  list.value = res.result.artists
  pageInfo.total = res.result.artistCount
  isLoading.value = false
})

const router = useRouter()
const toArtistDetail = (id) => {
  router.push({
    name: 'ArtistDetail',
    query: {id}
  })
}
</script>

<template>
  <div>
    <!--  搜索 单曲页面 -->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <ImgWidthList :list="list" mode="ar" @clickItem="toArtistDetail"></ImgWidthList>
  </div>
</template>

<style scoped lang="less">

</style>