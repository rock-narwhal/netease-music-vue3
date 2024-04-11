<script setup>
import {ref, reactive, onMounted, watch} from "vue"
import {playlistSongs} from "@/api/api_playlist.js";
import {useRoute} from "vue-router";
import MusicList from "@/components/list/MusicList.vue";

const songs = ref([])

const isLoading = ref(false)

const playlistId = ref('')

const titles = reactive([
  {val: '操作', width: '5%'},
  {val: '音乐标题', width: '45%'},
  {val: '歌手', width: '20%'},
  {val: '专辑', width: '20%'},
  {val: '时长', width: '10%'}
])

const route = useRoute()
onMounted(() => {
  playlistId.value = route.query.id
  queryPlaylistSongs()
})

watch(() => route.query, (val) => {
  playlistId.value = val.id
  queryPlaylistSongs()
})

const queryPlaylistSongs = async () => {
  isLoading.value = true
  const res = await playlistSongs(playlistId.value)
  if (res.code !== 200) return
  songs.value = res.songs
  isLoading.value = false
}
</script>

<template>
  <div class="playlist-wrapper">
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" :titles="titles" :data-list="songs"></MusicList>
  </div>
</template>

<style scoped lang="less">
.playlist-wrapper {
  margin: 0 30px;
}
</style>