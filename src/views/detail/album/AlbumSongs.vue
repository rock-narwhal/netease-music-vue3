<script setup>
import {ref, reactive, watch, onMounted} from "vue"
import {albumDetail} from "@/api/api_music.js";
import {useRoute} from "vue-router";
import MusicList from "@/components/list/MusicList.vue";

const titles = reactive([
  {val:'',width: '5%'},
  {val:'音乐标题',width:'45%'},
  {val:'歌手',width:'20%'},
  {val:'专辑',width:'20%'},
  {val:'时长',width:'10%'}
])

const albumId = ref('')
const isLoading = ref(false)
const songs = ref([])

const route = useRoute()

watch(()=>route.query, (val)=>{
  albumId.value = val.id
  getAlbumMusicList()
})

onMounted(()=>{
  albumId.value = route.query.id
  getAlbumMusicList()
})
const getAlbumMusicList = async () =>{
  isLoading.value = true
  const res = await albumDetail(albumId.value)
  if(res.code !== 200) return
  songs.value = res.songs
  isLoading.value = false
}

const playMusic = (id) =>{

}
</script>

<template>
  <div>
    <el-skeleton :rows="10" animated v-show="isLoading"></el-skeleton>
    <MusicList v-show="!isLoading" style="margin:0 30px" :titles="titles" :data-list="songs" :dbClick="playMusic"></MusicList>
  </div>
</template>

<style scoped lang="less">

</style>