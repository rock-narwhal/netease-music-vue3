<script setup>
import {ref, watch, onMounted} from "vue"
import {albumDetail} from "@/api/api_music.js";
import {useRoute} from "vue-router";
import MusicList from "@/components/list/MusicList.vue";
import emitter from '@/utils/MittBus.js'

const albumId = ref('')
const isLoading = ref(false)
const songs = ref([])

const route = useRoute()

watch(() => route.query, (val) => {
  albumId.value = val.id
  getAlbumMusicList()
})

onMounted(() => {
  albumId.value = route.query.id
  getAlbumMusicList()
})
const getAlbumMusicList = async () => {
  isLoading.value = true
  const res = await albumDetail(albumId.value)
  if (res.code !== 200) return
  songs.value = res.songs
  isLoading.value = false
}

const playMusic = (id) => {
  emitter.emit('playMusic', id)
}
</script>

<template>
  <div>
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :data-list="songs" @clickItem="playMusic"></MusicList>
  </div>
</template>

<style scoped lang="less">

</style>