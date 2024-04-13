<script setup>
import {ref, onMounted} from 'vue'
import {getPersonalized, getRecommend} from "@/api/api_playlist.js";
import {getBanner} from "@/api/api_other.js";
import {useRouter} from "vue-router";
import ImgList from '@/components/list/ImgList.vue'

const imgList = ref([])
onMounted(async () => {
  const res = await getBanner()
  if (res.code !== 200) return
  imgList.value = res.banners
})

const recSongList = ref([])
onMounted(async (limit) => {
  const res = await getPersonalized(limit)
  if (res.code !== 200) return
  recSongList.value = res.result
})
// 播放选中的歌曲
const playRecSong = (id) => {

}

const recommendList = ref([])
//
onMounted(async () => {
  const res = await getRecommend()
  if (res.code !== 200) return
  recommendList.value = res.recommend
})
// 播放选中的专辑
const playRecommend = (id) => {

}

const bannerHeight = ref(200)

const clickImage = (item) => {
  console.log('click Banner Img ', item)
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
</script>

<template>
  <!--  个性推荐页面-->
  <div class="container">
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
    <div class="play-list">
      <h2 class="font-20 font-bold pointer" @click="toPlayList" v-show="recSongList.length > 0">
        热门推荐 <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ImgList type="playlist"
               @clickPlay="playRecSong"
               @clickImg="toPlayListDetail"
               :list="recSongList"
               btn-size="middle">
        <template v-slot="{item}">
          <div class="text-hidden"></div>
          {{ item.name }}
        </template>
      </ImgList>
    </div>
    <div class="play-list">
      <h2 class="font-20 font-bold pointer" @click="toPlayList" v-show="recommendList.length > 0">
        推荐歌单 <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ImgList type="playlist"
               @clickPlay="playRecommend"
               @clickImg="toPlayListDetail"
               :list="recommendList">
        <template v-slot="{item}">
          <div class="text-hidden"></div>
          {{ item.name }}
        </template>
      </ImgList>
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
  }
}
</style>