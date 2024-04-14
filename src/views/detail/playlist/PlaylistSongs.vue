<script setup>
import {ref, reactive, onMounted, watch} from "vue"
import {playlistSongs} from "@/api/api_playlist.js";
import {useRoute} from "vue-router";
import MusicList from "@/components/list/MusicList.vue";

const songs = ref([])

const isLoading = ref(false)

const playlistId = ref('')


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
    <MusicList v-show="!isLoading" :data-list="songs"></MusicList>
  </div>
</template>

<style scoped lang="less">
.playlist-wrapper {
  margin: 0 30px;
}
</style>