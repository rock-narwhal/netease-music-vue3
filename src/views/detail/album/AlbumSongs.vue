<script setup>
import {ref, watch, onMounted, reactive} from "vue"
import {albumDetail} from "@/api/api_music.js";
import {useRoute} from "vue-router";
import MusicList from "@/components/list/MusicList.vue";
import emitter from '@/utils/MittBus.js'

const isLoading = ref(false)
const songs = ref([])

const route = useRoute()

watch(() => route.query, (val) => {
  queryInfo.id = val.id
  getAlbumMusicList()
})

onMounted(() => {
  queryInfo.id = route.query.id
  getAlbumMusicList()
})
const getAlbumMusicList = async () => {
  isLoading.value = true
  const res = await albumDetail(queryInfo)
  if (res.code !== 200) return
  songs.value = res.songs
  isLoading.value = false
}

const playMusic = (id) => {
  emitter.emit('playMusic', id)
}

const pageInfo = reactive({
  current: 1,
  total: 0,
})

const queryInfo = reactive({
  offset: 0,
  limit: 50,
  id: ''
})

const onPageChange = (page) =>{
  if (page === pageInfo.current) return
  emitter.emit('contentScrollTop')
  pageInfo.current = page
  queryInfo.offset = (page - 1) * queryInfo.limit
  getAlbumMusicList()
}
</script>

<template>
  <div>
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :data-list="songs" @clickItem="playMusic"></MusicList>
    <div class="pagination" v-show="songs.length > 0">
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