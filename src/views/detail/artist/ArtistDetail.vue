<script setup>
import {ref, watch, onMounted} from 'vue'
import {useRoute} from "vue-router";
import {artistDetail} from "@/api/api_artist.js";
import DetailBanner from "@/components/banner/DetailBanner.vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";

const menu = ref([
  {name: 'ArtistAlbum', path: '/detail/artist/album', title: '专辑'},
  {name: 'ArtistMV', path: '/detail/artist/mv', title: 'MV'},
  {name: 'ArtistInfo', path: '/detail/artist/info', title: '歌手详情'},
  {name: 'SimilarArtist', path: '/detail/artist/similar', title: '相似歌手'}
])

const artist = ref({id:''})
const route = useRoute()
watch(() => route.query, (val) => {
  if(val.id === artist.value.id) return
  artist.value.id = val.id
  getArtistDetail()
})

onMounted(()=>{
  artist.value.id = route.query.id
  getArtistDetail()
})

const getArtistDetail = async () => {
  const res = await artistDetail(artist.value.id)
  if (res.code !== 200) return
  artist.value = res.data.artist
}
</script>

<template>
  <div class="artist-detail">
    <div class="artist-banner">
      <detail-banner :avatar="artist.avatar +'?param=400y400'" v-show="artist.avatar">
        <template v-slot:title>
          <div class="font-24" style="font-weight: bold">{{ artist.name }}</div>
          <div style="margin-top: 5px">{{ artist.transNames && artist.transNames[0] }}</div>
        </template>
        <template v-slot:buttons>
          <div class="button-group">
            <button class="cir-btn-white pointer font-14">
              <svg-icon name="collection-records" class-name="font-18" vertical="-0.2"></svg-icon>
              收藏
            </button>
            <button class="cir-btn-white pointer font-14">
              <svg-icon name="me" class-name="font-18" vertical="-0.2"></svg-icon>
              个人主页
            </button>
          </div>
        </template>
        <template v-slot:others>
          <div class="artist-other-info">
            <span>单曲数:{{ artist.musicSize }}</span>
            <span>专辑数:{{ artist.albumSize }}</span>
            <span>MV数:{{ artist.mvSize }}</span>
          </div>
        </template>
      </detail-banner>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="menu" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.artist-detail {
  margin-top: 30px;

  .artist-banner {
    margin: 0 30px 20px;

    .button-group {
      margin: 10px 0;
      vertical-align: middle;

      button {
        margin-right: 10px;
      }
    }
    .artist-other-info{
      margin-top: 15px;
      span{
        margin-right: 20px;
      }
    }
  }
}
</style>