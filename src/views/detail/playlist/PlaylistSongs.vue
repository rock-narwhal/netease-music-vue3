<script setup>
import {ref, onMounted, watch, reactive} from "vue"
import {getPlayListDetail, playlistSongs} from "@/api/api_playlist.js";
import {useRoute} from "vue-router";
import MusicList from "@/components/list/MusicList.vue";
import emitter from '@/utils/MittBus.js'

const songs = ref([])

const isLoading = ref(false)

// const playlistId = ref('')

const pageInfo = reactive({
  current: 1,
  total: 0,
})

const queryInfo = reactive({
  offset: 0,
  limit: 50,
  id: ''
})

const route = useRoute()
onMounted(() => {
  queryInfo.id = route.query.id
  queryPlaylistSongs()
  queryPlaylistCount()
})

watch(() => route.query, (val) => {
  queryInfo.id = val.id
  queryPlaylistSongs()
  queryPlaylistCount()
})

const queryPlaylistCount = async () => {
  const res = await getPlayListDetail(queryInfo.id)
  if(res.code !== 200){
    return
  }
  pageInfo.total = res.playlist.trackCount
}

const queryPlaylistSongs = async () => {
  isLoading.value = true
  const res = await playlistSongs(queryInfo)
  if (res.code !== 200) return
  songs.value = res.songs
  isLoading.value = false
}

const playMusic = (id) =>{
  emitter.emit('playMusic', id)
}

const onPageChange = (page) =>{
  if (page === pageInfo.current) return
  emitter.emit('contentScrollTop')
  pageInfo.current = page
  queryInfo.offset = (page - 1) * queryInfo.limit
  queryPlaylistSongs()
}
</script>

<template>
  <div class="playlist-wrapper">
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" :data-list="songs" @click-item="playMusic"></MusicList>
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
.playlist-wrapper {
  margin: 0 30px;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
</style>