<script setup>
import {ref, reactive, onMounted, watch} from 'vue'
import {getPlayListDetail} from "@/api/api_playlist.js";
import {format} from "@/utils/DateUtil.js";
import {toCNNum} from "@/utils/FormatUtil.js";
import {useRoute} from "vue-router";
import DetailBanner from "@/components/banner/DetailBanner.vue";
import TabMenu from "@/components/menu/TabMenu.vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import SongTag from "@/components/commons/SongTag.vue";

const menu = reactive([
  {name: 'PlaylistSongs', path: '/detail/playlist/songs', title: '歌曲列表'},
  {name: 'PlaylistComments', path: '/detail/playlist/comments', title: '评论'},
  {name: 'PlaylistSubscribers', path: '/detail/playlist/subscribers', title: '收藏者'}
])

const playlistInfo = ref({id: ''})

const creator = ref({})

const route = useRoute()
onMounted(() => {
  playlistInfo.value.id = route.query.id
  queryPlaylistInfo()
})

watch(() => route.query, (val) => {
  if (playlistInfo.value.id === val.id) return
  playlistInfo.value.id = val.id
  queryPlaylistInfo()
})
const queryPlaylistInfo = async () => {
  const res = await getPlayListDetail(playlistInfo.value.id)
  if (res.code !== 200) return
  playlistInfo.value = res.playlist
  creator.value = res.playlist.creator
}
</script>

<template>
  <div class="playlist-detail-wrapper">
    <div class="playlist-banner">
      <detail-banner :avatar="playlistInfo.coverImgUrl + '?param=400y400'" v-show="playlistInfo.coverImgUrl">
        <template v-slot:title>
          <song-tag tag="歌单" size="large" style="float: left;margin-top: 5px; margin-right: 8px"></song-tag>
          <div class="playlist-title text-hidden">{{ playlistInfo.name }}</div>
          <div class="creator-info">
            <img v-lazy="creator.avatarUrl" class="pointer">
            <span class="pointer" style="color: #0077aa; margin: 0 5px">{{ creator.nickname }}</span>
            <span style="color: #c2c2c2">{{ format(playlistInfo.createTime) + '创建' }}</span>
          </div>
        </template>
        <template v-slot:buttons>
          <div class="button-group">
            <button class="cir-btn-red pointer font-14">
              <svg-icon name="play-fill" class-name="font-20" vertical="-0.25"></svg-icon>
              播放全部
            </button>
            <button class="cir-btn-white pointer font-14 dark-color">
              <svg-icon name="collection-records" class-name="font-20" vertical="-0.25"></svg-icon>
              收藏
            </button>
            <button class="cir-btn-white pointer font-14 dark-color">
              <svg-icon name="share" class-name="font-18" vertical="-0.2"></svg-icon>
              分享
            </button>
            <button class="cir-btn-white pointer font-14 dark-color">
              <svg-icon name="download-one" class-name="font-20" vertical="-0.25"></svg-icon>
              下载全部
            </button>
          </div>
        </template>
        <template v-slot:others>
          <div class="playlist-other">
            <div v-if="playlistInfo.tags && playlistInfo.tags.length > 0" style="margin-bottom: 5px">标签 :
              <span>{{ playlistInfo.tags[0] }}</span>
            </div>
            <div style="margin-bottom: 5px">歌曲 : <span class="dark-color">{{ playlistInfo.trackCount }} </span>
              播放 : <span class="dark-color">{{ toCNNum(playlistInfo.playCount) }}</span>
            </div>
            <div>简介 :</div>
          </div>
        </template>
      </detail-banner>
    </div>
    <TabMenu style="margin: 0 30px" :menu-list="menu" :query="$route.query"></TabMenu>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="less">
.playlist-detail-wrapper {
  margin-top: 30px;

  .playlist-banner {
    margin: 0 30px 20px;
    width: 100%;

    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      vertical-align: middle;
    }

    .creator-info {
      line-height: 30px;
    }

    .playlist-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      height: 32px;
      line-height: 32px;
    }

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