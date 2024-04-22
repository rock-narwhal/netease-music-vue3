<script setup>
import {ref, reactive, onMounted} from "vue"
import {useRoute} from "vue-router";
import {playlistComments} from "@/api/api_playlist.js";
import UserComment from "@/components/commons/UserComment.vue";
import CommentInput from "@/components/commons/CommentInput.vue";
import emitter from "@/utils/MittBus.js";

const hotComments = ref([])

const comments = ref([])

const pageInfo = reactive({
  current: 1,
  total: 0,
  hasMore: false,
  isLoading: false
})

const queryInfo = reactive({
  offset: 0,
  limit: 20,
  id: ''
})

const route = useRoute()

onMounted(() => {
  queryInfo.id = route.query.id
  loadComments()
})

const loadComments = async () =>{
  pageInfo.isLoading = true
  const res = await playlistComments(queryInfo)
  if (res.code !== 200) return
  hotComments.value = res.hotComments || []
  comments.value = res.comments
  pageInfo.hasMore = res.hasMore
  pageInfo.total = res.total
  pageInfo.isLoading = false
}

const onPageChange = (page) => {
  if (page === pageInfo.current) return
  pageInfo.current = page
  queryInfo.offset = (page - 1) * queryInfo.limit
  loadComments()
  emitter.emit('contentScrollTop')
}

const commentObj = reactive({
  send: 1,
  commentType: 2,
  id: queryInfo.id,
  commentId: '',
  replyPrefix: ''
})

const cancelReplay = () => {
  commentObj.send = 1
  commentObj.commentId = ''
  commentObj.replyPrefix = ''
}

const doReply = (item) => {
  commentObj.send = 2
  commentObj.commentId = item.id
  commentObj.replyPrefix = '@' + item.user.nickname + ': '
}
</script>

<template>
  <div class="playlist-comments-wrapper">
    <comment-input :send="commentObj.send"
                   :comment-type="commentObj.commentType"
                   :id="commentObj.id"
                   :comment-id="commentObj.commentId"
                   :reply-prefix="commentObj.replyPrefix"
                   @replay-cancel="cancelReplay">
    </comment-input>
    <div style="margin-top: 10px; margin-bottom: 50px" v-show="hotComments.length > 0">
      <span class="title">精彩评论</span>
      <ul>
        <li v-for="item in hotComments" :key="item.commentId">
          <user-comment :comment="item"
                        @click-reply="doReply(item)">
          </user-comment>
        </li>
      </ul>
    </div>
    <div>
      <span class="title">最新评论({{ pageInfo.total }})</span>
      <ul>
        <li v-for="item in comments" :key="item.commentId">
          <user-comment :comment="item"
                        @click-reply="doReply(item)">
          </user-comment>
        </li>
      </ul>
    </div>
    <div class="pagination mar-top-30" v-show="comments.length > 0">
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
</template>

<style scoped lang="less">
.playlist-comments-wrapper {
  margin: 0 30px;
}

.title {
  font-size: 14px;
  font-weight: bold;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
}
</style>