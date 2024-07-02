<script setup>
import {onMounted, ref, watch, reactive} from 'vue'
import {useRoute} from "vue-router";
import {cloudSearch} from "@/api/api_music.js";
import MusicList from "@/components/list/MusicList.vue";
import emitter from '@/utils/MittBus.js'
import SvgIcon from "@/components/svg/SvgIcon.vue";

const isLoading = ref(false)
const pageInfo = reactive({
  current: 1,
  total: 0,
})

const queryInfo = reactive({
  offset: 0,
  limit: 50,
  type: 1,//单曲
  keywords: '',
})

const route = useRoute()

const songList = ref([])
onMounted(() => {
  let keywords = decodeURI(route.query.keywords)
  queryInfo.keywords = keywords.replaceAll(/\s+/g, '+')
  doSearch()
})

watch(() => route.query, (val) => {
  let keywords = decodeURI(val.keywords)
  queryInfo.keywords = keywords.replaceAll(/\s+/g, '+')
  doSearch()
})

const doSearch = async () => {
  isLoading.value = true
  const res = await cloudSearch(queryInfo)
  if (res.code !== 200) return
  songList.value = res.result.songs
  pageInfo.total = res.result.songCount
  isLoading.value = false
}

const playMusic = (id) => {
  emitter.emit('playMusic', id)
}

const onPageChange = (page) =>{
  if (page === pageInfo.current) return
  emitter.emit('contentScrollTop')
  pageInfo.current = page
  queryInfo.offset = (page - 1) * queryInfo.limit
  doSearch()
}

</script>

<template>
  <div>
    <!--  搜索 单曲页面  {{$route.query}}-->
    <div class="mar-side-30 mar-bot-10">
      <button class="cir-btn-red pointer font-14 mar-ri-10">
        <svg-icon name="play-fill" class-name="font-20" vertical="-0.25"></svg-icon>
        播放全部
      </button>

      <button class="cir-btn-white pointer font-14 dark-color">
        <svg-icon name="download-one" class-name="font-20" vertical="-0.25"></svg-icon>
        下载全部
      </button>
    </div>
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :data-list="songList" @clickItem="playMusic"></MusicList>
    <div class="pagination" v-show="songList.length > 0">
      <el-pagination
          background
          :small="true"
          :page-size="50"
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
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
</style>