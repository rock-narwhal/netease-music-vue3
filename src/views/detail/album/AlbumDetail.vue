<script setup>
import {ref, reactive, watch, onMounted, computed} from "vue"
import {useRoute} from "vue-router";
import {albumDetail, albumDetailDynamic} from "@/api/api_music.js";
import {format} from '@/utils/DateUtil.js'
import TabMenu from "@/components/menu/TabMenu.vue";
import DetailBanner from "@/components/banner/DetailBanner.vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";

const menu = reactive([
  {name: 'AlbumSongs', path: '/detail/album/songs', title: '歌曲列表'},
  {name: 'AlbumComments', path: '/detail/album/comments', title: '评论'},
  {name: 'AlbumInfo', path: '/detail/album/info', title: '专辑详情'}
])

const album = ref({})

const songs = ref([])

const route = useRoute()

watch(() => route.query, (val) => {
  if(val.id === album.value.id) return
  album.value.id = val.id
  getAlbumDetail()
  getAlbumDynamic()
})

onMounted(() => {
  album.value.id = route.query.id
  getAlbumDetail()
  getAlbumDynamic()
})

const getAlbumDetail = async () => {
  const res = await albumDetail(album.value.id)
  if (res.code !== 200) return
  album.value = res.album
  songs.value = res.songs
}

const albumInfo = ref({})
const getAlbumDynamic = async () => {
  const res = await albumDetailDynamic(album.value.id)
  if (res.code !== 200) return
  albumInfo.value = res
}

const checkVip = computed(() => {
  return songs.value.filter(item => item.fee === 1).length > 0
})
</script>

<template>
  <div class="album-detail">
    <div class="album-banner">
      <detail-banner :avatar="album.picUrl + '?param=400y400'" v-show="album.picUrl">
        <template v-slot:title>
          <div class="font-24" style="font-weight: bold">{{ album.name }}</div>
        </template>
        <template v-slot:buttons>
          <div class="button-group">
            <!--          按钮-->
            <button class="cir-btn-red pointer font-14" v-show="checkVip"
                    style="background-color: #ec4141; color: white">
              <svg-icon name="play-fill" class-name="font-20" vertical="-0.25"></svg-icon>
              开通VIP畅听专辑
            </button>
            <button class="cir-btn-white pointer font-14 dark-color" v-show="!albumInfo.isSub">
              <svg-icon name="collection-records" class-name="font-18" vertical="-0.2"></svg-icon>
              收藏({{ albumInfo.subCount }})
            </button>
            <button class="cir-btn-white pointer font-14 dark-color">
              <svg-icon name="download-one" class-name="font-18" vertical="-0.2"></svg-icon>
              VIP下载
            </button>
            <button class="cir-btn-white pointer font-14 dark-color" v-show="albumInfo">
              <svg-icon name="share" class-name="font-16" vertical="-0.2"></svg-icon>
              {{ albumInfo.shareCount }}
            </button>
          </div>
        </template>
        <template v-slot:others>
          <div v-if="album.artist">歌手：{{ album.artist.name }}</div>
          <div>时间：{{ format(album.publishTime) }}</div>
        </template>
      </detail-banner>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="menu" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.album-detail {
  margin-top: 30px;

  .album-banner {
    margin: 0 30px 20px;

    .button-group {
      margin: 10px 0;
      vertical-align: middle;

      button {
        margin-right: 10px;
      }
    }
  }
}
</style>