<script setup>
import {computed, watch, ref,onMounted} from 'vue'
import {getSuggest} from "@/api/api_other.js";
import {useRouter} from "vue-router";
import SuggestList from "@/components/list/SuggestList.vue";
import emitter from "@/utils/MittBus.js";

const props = defineProps(['keywords'])
//搜索建议
const suggestInfo = ref({
  songs: [],
  albums: [],
  artists: [],
  playlists: []
})
// 监听keywords变化
watch(() => props.keywords, (val) => {
  doGetSuggest(val)
})

onMounted(() =>{
  doGetSuggest(props.keywords)
})

let timer = 0
const doGetSuggest = async (val) => {
  if (!val) return
  window.clearTimeout(timer)
  timer = window.setTimeout(async () => {
    const res = await getSuggest({keywords:val})
    if (res.code !== 200) return
    suggestInfo.value = res.result
  },500)
}
// 显示音乐
const showMusic = computed(() => {
  return suggestInfo.value.songs && suggestInfo.value.songs.length > 0
})
// 显示专辑
const showAlbum = computed(() => {
  return suggestInfo.value.albums && suggestInfo.value.albums.length > 0
})
// 显示歌手
const showArtist = computed(() => {
  return suggestInfo.value.artists && suggestInfo.value.artists.length > 0
})
//显示歌单
const showPlayList = computed(() => {
  return suggestInfo.value.playlists && suggestInfo.value.playlists.length > 0
})

const router = useRouter()
// 播放音乐
const playMusic = (id) =>{
  emitter.emit('playMusic',id)
}
// 跳转到专辑页面
const toAlbumDetail = (id) =>{
  router.push({
    name:'AlbumDetail',
    query:{
      id
    }
  })
}
//跳转到歌手页
const toArtistDetail = (id) =>{
  router.push({
    name:'ArtistDetail',
    query:{
      id
    }
  })
}
// 跳转到歌单页
const toPlayListDetail = (id) =>{
  router.push({
    name:'PlaylistDetail',
    query:{
      id
    }
  })
}
</script>

<template>
  <div class="search-suggest">
    <div class="search-suggest-wrap">
      <button class="no-btn">
        搜"{{ keywords }}"相关的内容
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
    <!--            单曲建议-->
    <suggest-list v-if="showMusic">
      <template #title>
        <i class="iconfont icon-yinle font-16"></i>
        <span class="mleft-10">单曲</span>
      </template>
      <template #item>
        <div v-for="song in suggestInfo.songs"
             :key="song.id"
             class="item pointer text-hidden"
             @click.stop="playMusic(song.id)">
          {{ song.name }} - {{ song.artists[0].name }}
        </div>
      </template>
    </suggest-list>
    <!--            专辑建议-->
    <suggest-list v-if="showAlbum">
      <template #title>
        <i class="iconfont icon-zhuanji font-16"></i>
        <span class="mleft-10">专辑</span>
      </template>
      <template #item>
        <div v-for="al in suggestInfo.albums"
             :key="al.id"
             class="item pointer text-hidden"
             @click="toAlbumDetail(al.id)">
          {{ al.name }} - {{ al.artist.name }}
        </div>
      </template>
    </suggest-list>
    <suggest-list v-if="showArtist">
      <template #title>
        <i class="el-icon-user font-16">
          <span class="mleft-10">歌手</span>
        </i>
      </template>
      <template #item>
        <div v-for="ar in suggestInfo.artists"
             :key="ar.id"
             class="item pointer text-hidden"
             @click="toArtistDetail(ar.id)">
          {{ ar.name }}
        </div>
      </template>
    </suggest-list>
    <suggest-list v-if="showPlayList">
      <template #title>
        <i class="iconfont icon-gedan font-16"></i>
        <span class="mleft-10">歌单</span>
      </template>
      <template #item>
        <div v-for="pl in suggestInfo.playlists"
             :key="pl.id"
             class="item pointer text-hidden"
             @click="toPlayListDetail(pl.id)">
          {{ pl.name }}
        </div>
      </template>
    </suggest-list>
  </div>
</template>

<style scoped>
.search-suggest-wrap{
  height: 30px;
  line-height: 30px;
}
.item{
  line-height: 30px;
}
</style>