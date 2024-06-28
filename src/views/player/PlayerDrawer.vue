<script setup>
import {ref, computed, reactive, watch} from "vue";
import {playStore} from "@/store/playStore.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import SongTag from "@/components/commons/SongTag.vue";
import mitt from "@/utils/MittBus.js";
import ScrollLyric from "@/components/commons/ScrollLyric.vue";
import {songComments} from "@/api/api_music.js";
import UserComment from "@/components/commons/UserComment.vue";

const player = playStore().player
const playingInfo = playStore().playingInfo

const bgStyle = computed(() => {
  return {
    '--background-image': `url('${playingInfo.coverUrl}')`,
  }
})

const onOpen = async () => {
  // 打开时更新歌词
  mitt.emit('doUpdateLyric')

  queryInfo.id = playingInfo.id
  if(playerRef.value){
    playerRef.value.scrollTop = 0
  }
  await queryComments()
}

const comments = ref([])

const hotComments = ref([])

const queryInfo = reactive({
  id: 0,
  offset: 0,
  limit: 20
})

const pageInfo = reactive({
  curPage: 1,
  total: 1,
  hasMore: false
})

const isLoading = ref(false)

const queryComments = async () => {
  if (playingInfo.id === 0) return
  isLoading.value = true
  const res = await songComments(queryInfo)
  if (res.code !== 200) {
    isLoading.value = false
    return
  }
  comments.value = res.comments
  pageInfo.hasMore = res.more
  pageInfo.total = res.total
  hotComments.value = res.hotComments || []
  isLoading.value = false
}

watch(() => playingInfo.id, (val) => {
  queryInfo.id = val
  queryInfo.offset = 0
  if(playerRef.value){
    playerRef.value.scrollTop = 0
  }
  queryComments()
})

const playerRef = ref(null)

const onPageChange = (page) => {
  if (page === pageInfo.current) return
  if(playerRef.value){
    playerRef.value.scrollTop = 600
  }
  pageInfo.current = page
  queryInfo.offset = (page - 1) * queryInfo.limit
  queryComments()
}

const doReply = (item) => {

}

</script>

<template>
  <el-drawer v-model="player.open"
             direction="btt"
             size="100%"
             :with-header="false"
             :z-index="90"
             @open="onOpen">
    <div class="player-wrapper" :style="bgStyle" ref="playerRef">
      <div class="space-aside"></div>
      <div class="content-area">
        <div class="cover-lyric">
          <div class="cover-wrapper">
            <img :src="playingInfo.coverUrl" alt="">
          </div>
          <div class="lyric-wrapper">
            <div class="song-name">
              <span>{{ playingInfo.name + '&nbsp;' }}</span>
              <song-tag tag="MV">
                <svg-icon name="play-fill" class-name="font-10" vertical="-0.13"></svg-icon>
              </song-tag>
            </div>
            <div class="song-info">
              <p>歌手:{{ playingInfo.artists[0].name }}&nbsp;&nbsp;&nbsp;专辑:{{ playingInfo.album.name }}&nbsp;&nbsp;&nbsp;来源:{{
                  playingInfo.artists[0].name
                }}</p>
            </div>
            <div class="lyric-area">
              <ScrollLyric></ScrollLyric>
            </div>
          </div>
        </div>
        <div class="other-infos">
          <!--          评论区-->
          <div class="comments-area">
            <div style="margin-top: 10px; margin-bottom: 50px" v-show="hotComments.length > 0">
              <span class="title">全部评论({{ pageInfo.total }})</span>
              <ul>
                <li v-for="item in hotComments" :key="item.commentId">
                  <user-comment :comment="item"
                                @click-reply="doReply(item)">
                  </user-comment>
                </li>
              </ul>
            </div>

            <div style="margin-bottom: 50px">
              <span class="title">最新评论({{ pageInfo.total }})</span>
              <ul>
                <li v-for="item in comments" :key="item.commentId">
                  <user-comment :comment="item"
                                @click-reply="doReply(item)">
                  </user-comment>
                </li>
              </ul>
            </div>
            <div class="pagination" v-show="comments.length > 0">
              <el-pagination
                  background
                  :small="true"
                  :page-size="50"
                  layout="prev, pager, next"
                  :total="pageInfo.total"
                  @current-change="onPageChange"
                  @prev-click="onPageChange(pageInfo.currentPage -1)"
                  @next-click="onPageChange(pageInfo.currentPage -1)">
              </el-pagination>
            </div>
          </div>
          <!--          推荐-->
<!--          <div class="recommend-area"></div>-->
        </div>
      </div>

      <div class="space-aside"></div>
    </div>
  </el-drawer>
</template>

<style scoped lang="less">
.full-height-drawer .el-drawer__container {
  height: 100%;
  //overflow-x: hidden;
  //overflow-y: auto;
}

.player-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  position: relative;
  scroll-behavior: smooth;

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

  .content-area {
    width: 920px;

    padding-top: 80px;
  }

  .cover-lyric {
    display: flex;
    width: 100%;

    .cover-wrapper {
      width: 240px;
      padding-top: 100px;
      margin-left: 60px;

      img {
        border-radius: 8px;
        display: block;
      }
    }

    .lyric-wrapper {
      width: 640px;
      padding: 0 100px;

      .song-name {
        font-size: 24px;
        margin-bottom: 10px;
      }

      .song-info {
        margin-bottom: 30px;
        color: #969896;
      }

      .lyric-area {
        height: 300px;
      }
    }
  }

  .other-infos{
    margin-top: 100px;
    .comments-area{
      scroll-behavior: smooth;
      .pagination {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
      }
    }
  }
}
</style>