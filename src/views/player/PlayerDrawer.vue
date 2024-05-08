<script setup>
import {ref, onMounted, onUnmounted, computed} from "vue";
import {playStore} from "@/store/playStore.js";
import {getLyric} from "@/api/api_music.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import SongTag from "@/components/commons/SongTag.vue";

const player = playStore().player
const playingInfo = playStore().playingInfo

const bgStyle = computed(() => {
  return {
    '--background-image': `url('${playingInfo.coverUrl}')`,
  }
})

const onOpen = async () => {
  if (playingInfo.id > 0 && !playingInfo.lyric) {
    const res = await getLyric(playingInfo.id)
    if (res.code !== 200) return
    playingInfo.lyric = res.lrc.lyric
  }
}
</script>

<template>
  <el-drawer v-model="player.open"
             direction="btt"
             size="100%"
             :with-header="false"
             :z-index="90"
             @open="onOpen">
    <div class="player-wrapper" :style="bgStyle">
      <div class="space-aside"></div>
      <div class="content-area">
        <div class="cover-lyric">
          <div class="cover-wrapper">
            <img :src="playingInfo.coverUrl" alt="">
          </div>
          <div class="lyric-wrapper">
            <div class="song-name">
              <span>{{ playingInfo.name }}</span>
              <song-tag tag="MV">
                <svg-icon name="play-fill" class-name="font-10" vertical="-0.13"></svg-icon>
              </song-tag>
            </div>
            <div class="song-info">
              <p>歌手:{{ playingInfo.artists[0].name }}&nbsp;&nbsp;&nbsp;专辑:{{ playingInfo.album.name }}&nbsp;&nbsp;&nbsp;来源:{{ playingInfo.artists[0].name }}</p>
            </div>
            <div class="lyric-area">

            </div>
          </div>
        </div>
      </div>

      <div class="space-aside"></div>
    </div>
  </el-drawer>
</template>

<style scoped lang="less">
.full-height-drawer .el-drawer__container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.player-wrapper {
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-size: cover;
    filter: blur(200px);
    opacity: 0.3;
    background-image: var(--background-image);
  }

  .space-aside {
    width: 500px;
    flex-shrink: 1;
    z-index: 10;
    min-width: 30px;
  }

  .content-area{
    width: 920px;

  }

  .cover-lyric {
    //flex-shrink: 0.1;
    //z-index: 10;
    display: flex;
    width: 100%;

    .cover-wrapper {
      width: 240px;

      img {
        border-radius: 8px;
        display: block;
      }
    }

    .lyric-wrapper {
      width: 680px;
      border: 1px solid black;
    }
  }
}
</style>