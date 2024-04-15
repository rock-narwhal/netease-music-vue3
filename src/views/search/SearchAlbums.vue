<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {cloudSearch} from "@/api/api_music.js";
import ImgWidthList from "@/components/list/ImgWidthList.vue";
import emitter from "@/utils/MittBus.js";

const isLoading = ref(false)

const pageInfo = ref({
  current: 1,
  total: 0,
})

const queryInfo = ref({
  offset: 0,
  limit: 20,
  type: 10,//专辑
  keywords: '',
})

const list = ref([])
const route = useRoute()

onMounted(async () => {
  let keywords = decodeURI(route.query.keywords)
  queryInfo.value.keywords = keywords.replaceAll(/\s+/g, '+')
  await queryAlbums()
})

const queryAlbums = async () => {
  isLoading.value = true
  const res = await cloudSearch(queryInfo.value)
  if (res.code !== 200) return
  list.value = res.result.albums
  pageInfo.value.total = res.result.albumCount
  isLoading.value = false
}

const router = useRouter()
const toAlbumDetail = (id) => {
  router.push({
    name: 'AlbumDetail',
    query: {id}
  })
}

const onPageChange = async (page) => {
  pageInfo.value.currentPage = page
  queryInfo.value.offset = (page - 1) * queryInfo.value.limit
  await queryAlbums()
  emitter.emit('contentScrollTop')
}
</script>

<template>
  <div class="album-wrap">
    <!--  搜索 单曲页面  {{$route.query}}-->
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <ImgWidthList :list="list" mode="al" @clickItem="toAlbumDetail">
      <template v-slot="{scope}">
        <span class="dark-color">{{ scope.artist.name }}</span>
        <span class="grey-color" v-if="scope.artist.trans">&nbsp;({{ scope.artist.trans }})</span>
      </template>
    </ImgWidthList>
    <div class="pagination" v-show="list.length > 0">
      <el-pagination
          :small="true"
          :page-size="20"
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
          @current-change="onPageChange"
          @prev-click="onPageChange(pageInfo.currentPage -1)"
          @next-click="onPageChange(pageInfo.currentPage -1)">
      </el-pagination>
    </div>
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

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    //padding-bottom: 30px;
    margin: 30px 0;
  }
}
</style>