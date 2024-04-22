<script setup>
import {ref, onMounted} from 'vue'
import {getPersonalized, getRecommend} from "@/api/api_playlist.js";
import {getBanner, privateContent} from "@/api/api_other.js";
import {useRouter} from "vue-router";
import ImgList from '@/components/list/ImgList.vue'
import SvgIcon from "@/components/svg/SvgIcon.vue";
import {getRecNewSong} from "@/api/api_music.js";
import MusicCard from "@/components/card/MusicCard.vue";
import PrivateMvList from "@/components/list/PrivateMvList.vue";
import ImgGrid from "@/components/grid/ImgGrid.vue";

const imgList = ref([])
onMounted(async () => {
  const res = await getBanner()
  if (res.code !== 200) return
  imgList.value = res.banners
})

const bannerHeight = ref(200)
const clickImage = (item) => {
  console.log('click Banner Img ', item)
}

const recPlaylist = ref([])
onMounted(async () => {
  const res = await getPersonalized(10)
  if (res.code !== 200) return
  recPlaylist.value = res.result
})
// 播放歌单
const playlistAll = (id) => {

}

const recommendList = ref([])
//
onMounted(async () => {
  const res = await getRecommend()
  if (res.code !== 200) return
  recommendList.value = res.recommend.splice(0, 10)
})
// 播放选中的专辑
const playRecommend = (id) => {

}

const router = useRouter()

// 跳转到首页playlist
const toPlayList = () => {
  router.push({
    name: 'PlayList'
  })
}
// 跳转到播放列表详情页
const toPlayListDetail = (id) => {
  router.push({
    name: 'PlaylistDetail',
    query: {
      id
    }
  })
}

const recNewSongs = ref([])
onMounted(async () => {
  const res = await getRecNewSong(12)
  if (res.code !== 200) return
  recNewSongs.value = res.result
})

const toLatestSongs = () => {
  router.push({name: 'LatestSongs'})
}

const priMvList = ref([])
onMounted(async () => {
  const res = await privateContent()
  if (res.code !== 200) return
  priMvList.value = res.result
})
// 跳转独家放送
const toPrivateMv = () => {
  router.push({name: 'PrivateContentPage'})
}
</script>

<template>
  <!--  个性推荐页面-->
  <div class="container mar-bot-30">
    <div class="swiper-wrap">
      <el-carousel :interval="4000" type="card" :height="bannerHeight + 'px'">
        <el-carousel-item
            v-for="item in imgList"
            :key="item.imageUrl"
        >
          <img class="img img-h swiper-img"
               :src="item.imageUrl"
               @click="clickImage(item)"
          >
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="play-list mar-top-30">
      <h2 class="font-20 font-bold pointer" @click="toPlayList" v-show="recPlaylist.length > 0">
        热门推荐
        <svg-icon name="arrow-right"></svg-icon>
      </h2>
      <img-grid type="playlist"
               @clickPlay="playlistAll"
               @clickImg="toPlayListDetail"
               :list="recPlaylist"
               btn-size="middle">
        <template v-slot="{item}">
          <div class="mar-top-10">
            {{ item.name }}
          </div>
        </template>
      </img-grid>
    </div>
    <div class="play-list">
      <h2 class="font-20 font-bold pointer" @click="toPlayList" v-show="recommendList.length > 0">
        推荐歌单
        <svg-icon name="arrow-right"></svg-icon>
      </h2>
      <img-grid type="playlist"
                @clickPlay="playlistAll"
                @clickImg="toPlayListDetail"
                :list="recommendList">
        <template v-slot="{item}">
          <div class="mar-top-10">
            {{ item.name }}
          </div>
        </template>
      </img-grid>
    </div>
    <div class="play-list  mar-top-15">
      <h2 class="font-20 font-bold pointer" @click="toPrivateMv" v-show="priMvList.length > 0">
        独家放送
        <svg-icon name="arrow-right"></svg-icon>
      </h2>
      <private-mv-list :list="priMvList"></private-mv-list>
    </div>
    <div class="play-list  mar-top-20">
      <h2 class="font-20 font-bold pointer" @click="toLatestSongs" v-show="recNewSongs.length > 0">
        最新音乐
        <svg-icon name="arrow-right"></svg-icon>
      </h2>
      <div class="grid-container">
        <music-card v-for="item in recNewSongs"
                    :key="item.id"
                    :song="item">
        </music-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  .swiper-img {
    border-radius: 10px;
  }

  .play-list {
    h2 {
      margin-bottom: 10px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 10px;
      row-gap: 15px;
    }
  }
}
</style>