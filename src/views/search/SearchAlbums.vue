<script setup>
import {ref,onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {cloudSearch} from "@/api/api_music.js";
import ImgWidthList from "@/components/list/ImgWidthList.vue";

const isLoading = ref(false)

const pageInfo = ref({
  current: 1,
  total: 0,
})

const queryInfo = ref({
  offset: 0,
  limit: 50,
  type: 10,//专辑
  keywords: '',
})

const list = ref([])
const route = useRoute()

onMounted(async () => {
  let keywords = decodeURI(route.query.keywords)
  queryInfo.value.keywords = keywords.replaceAll(/\s+/g, '+')
  isLoading.value = true
  const res = await cloudSearch(queryInfo.value)
  if (res.code !== 200) return
  list.value = res.result.albums
  pageInfo.value.total = res.result.albumCount
  isLoading.value = false
})

const router = useRouter()
const toAlbumDetail = (id) => {
  router.push({
    name: 'AlbumDetail',
    query: {id}
  })
}
</script>

<template>
  <div class="album-wrap">
    <!--  搜索 单曲页面  {{$route.query}}-->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <ImgWidthList :list="list" mode="al" @clickItem="toAlbumDetail">
      <template v-slot="{scope}">
        {{ scope.artist.name }} <span v-if="scope.artist.trans">({{ scope.artist.trans }})</span>
      </template>
    </ImgWidthList>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";
.album-wrap {
  ul {
    li {
      &:nth-child(odd) {
        background-color: @grey57;
      }
    }
  }
}
</style>