<script setup>
import {ref, reactive, onMounted} from "vue"
import {useRoute} from "vue-router";
import {albumComment} from "@/api/api_other.js";
import UserComment from "@/components/commons/UserComment.vue";

const hotComments = ref([])

const comments = ref([])

const pageInfo = reactive({
  current: 1,
  hasMore: true,
  total: 0,
})

const queryInfo = reactive({
  offset: 0,
  limit: 20,
  id: '',
})

const isLoading = ref(false)

const route = useRoute()

onMounted(async () => {
  queryInfo.id = route.query.id
  isLoading.value = true
  const res = await albumComment(queryInfo)
  if (res.code !== 200) return
  comments.value = res.comments
  pageInfo.hasMore = res.more
  pageInfo.total = res.total
  if (res.hotComments) hotComments.value = res.hotComments
  isLoading.value = false
})

</script>

<template>
  <div class="album-comment-wrapper">
    <div>假装是一个输入框</div>
    <div style="margin-top: 10px; margin-bottom: 50px" v-show="hotComments.length > 0">
      <span class="title">精彩评论</span>
      <ul>
        <li v-for="item in hotComments" :key="item.commentId">
          <user-comment :comment="item"></user-comment>
        </li>
      </ul>
    </div>
    <div style="margin-bottom: 50px">
      <span class="title">最新评论({{ pageInfo.total }})</span>
      <ul>
        <li v-for="item in comments" :key="item.commentId">
          <user-comment :comment="item"></user-comment>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.album-comment-wrapper {
  padding: 0 30px;
}

.title {
  font-size: 14px;
  font-weight: bold;
}
</style>