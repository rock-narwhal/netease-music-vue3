<script setup>
import {ref, onMounted, watch} from 'vue'
import {cloudSearch} from "@/api/api_music.js";
import TabMenu from "@/components/menu/TabMenu.vue";
import PlayListBanner from "@/components/banner/PlayListBanner.vue";
import {useRoute} from "vue-router";

const menu = ref([
  {name: 'SearchSongs', path: '/search/songs', title: '单曲'},
  {name: 'SearchAlbums', path: '/search/albums', title: '专辑'},
  {name: 'SearchArtists', path: '/search/artists', title: '歌手'},
  {name: 'SearchPlaylist', path: '/search/playlist', title: '歌单'},
  {name: 'SearchUsers', path: '/search/users', title: '用户'},
  {name: 'SearchMvs', path: '/search/mvs', title: 'MV'},
])

const queryInfo = ref({
  limit: 1,
  offset: 0,
  type: 1000, //歌单
  keywords: ''
})

const suggest = ref({})

const searchPlaylist = async () => {
  if (!queryInfo.value.keywords) return
  const res = await cloudSearch(queryInfo.value)
  if (res.code !== 200) return
  if (res.result.playlists.length > 0) {
    suggest.value = res.result.playlists[0]
  }
}
const route = useRoute()

onMounted(() => {
  queryInfo.value.keywords = route.query.keywords || ''
  searchPlaylist()
})

watch(() => route.query, (val) => {
  if(queryInfo.value.keywords === val.keywords) return
  queryInfo.value.keywords = val.keywords
  searchPlaylist()
})
</script>

<template>
  <div class="container">
    <div class="font-20 margin-30 search-title" style="font-weight: bold">搜索 : {{ decodeURIComponent($route.query.keywords) }}</div>
    <!--  你可能感兴趣-->
    <!--      <svg-icon class="font-18" icon-class="music"></svg-icon>-->
    <div class="margin-30" style="margin-bottom: 10px">你可能感兴趣</div>
    <PlayListBanner class="margin-30" :playlist="suggest" v-show="suggest.id"></PlayListBanner>
    <TabMenu class="margin-30" :menu-list="menu" mode="route" :query="$route.query"></TabMenu>
    <router-view v-slot="{Component}">
      <transition name="el-fade-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="less">
.margin-30 {
  margin: 0 30px;
}

.search-title {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>