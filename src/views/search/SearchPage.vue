<script setup>
import {ref, onMounted, watch} from 'vue'
import TabMenu from "@/components/menu/TabMenu.vue";
import PlayListBanner from "@/components/banner/PlayListBanner.vue";
import ArtistBanner from "@/components/banner/ArtistBanner.vue";
import AlbumBanner from "@/components/banner/AlbumBanner.vue";
import VideoBanner from "@/components/banner/VideoBanner.vue";
import SongBanner from "@/components/banner/SongBanner.vue";
import {useRoute} from "vue-router";
import {searchMutiMatch} from "@/api/api_other.js";

const menu = ref([
  {name: 'SearchSongs', path: '/search/songs', title: '单曲'},
  {name: 'SearchAlbums', path: '/search/albums', title: '专辑'},
  {name: 'SearchArtists', path: '/search/artists', title: '歌手'},
  {name: 'SearchPlaylist', path: '/search/playlist', title: '歌单'},
  {name: 'SearchUsers', path: '/search/users', title: '用户'},
  {name: 'SearchMvs', path: '/search/mvs', title: 'MV'},
])

const keywords = ref('')
const banners = ref([])

const config = {
  songs: SongBanner,
  playlist: PlayListBanner,
  album: AlbumBanner,
  artist: ArtistBanner,
  new_mlog: VideoBanner
}

const searchPlaylist = async () => {
  if (!keywords.value) return
  const res = await searchMutiMatch(keywords.value)
  if (res.code !== 200) return
  let arr = []
  if(!res.result.orders) return
  let order = res.result.orders
  order.forEach( key =>{
    if(key === 'playlist' || key === 'album' || key === 'artist')
    arr.push(...res.result[key].map(item => {
      item.component = config[key]
      return item
    }))
  })
  if(arr.length > 3){
    banners.value = arr.slice(0, 3)
  }else{
    banners.value = arr
  }
}
const route = useRoute()

onMounted(() => {
  keywords.value = route.query.keywords || ''
  searchPlaylist()
})

watch(() => route.query, (val) => {
  if(keywords.value === val.keywords) return
  keywords.value = val.keywords
  searchPlaylist()
})
</script>

<template>
  <div class="container">
    <div class="font-20 margin-30 search-title" style="font-weight: bold">搜索: {{ decodeURIComponent($route.query.keywords) }}</div>
    <div class="margin-30 font-12 dark-color" style="margin-bottom: 10px">你可能感兴趣</div>
    <div class="banner-wrapper mar-side-30">
      <component
          v-for="item in banners"
          :key="item.id"
          :is="item.component"
          :data="item"
      ></component>
<!--      <PlayListBanner class="margin-30" :playlist="suggest" v-show="suggest.id"></PlayListBanner>-->
    </div>
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
  margin-top: 20px;
  margin-bottom: 20px;
}

.banner-wrapper{
  display: flex;
}
</style>