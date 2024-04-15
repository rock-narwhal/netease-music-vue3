<script setup>
import {ref, watch} from 'vue'
import SvgIcon from "@/components/svg/SvgIcon.vue";
import {userStore} from "@/store/userStore.js";
import emitter from '@/utils/MittBus.js'
import {doComment} from "@/api/api_other.js";
import {ElMessage, ElNotification} from "element-plus";

const props = defineProps({
  send: {
    type: Number,
    default: 1, // 0删除评论 发送评论 1   回复评论 2
    validator: (val) => [0, 1, 2].includes(val)
  },
  commentType: { // 0 歌曲  1mv  2歌单 3专辑  4电台  5视频  6动态
    type: Number,
    required: true,
    validator: (val) => [0, 1, 2, 3, 4, 5, 6].includes(val)
  },
  id: {
    type: String,  //被评论资源的id
    required: true
  },
  commentId: { //回复时必须携带
    type: String
  },
  replyPrefix: { //回复他人时 携带的头部信息 @xxx:
    type: String
  }
})

const comment = ref('')

const user = userStore()

watch(() => props.commentId, (val) => {
  if (val > 0 && props.send === 2) { //触发回复
    comment.value = props.replyPrefix
  }
})

watch(comment, () => {
  if (props.send === 2) {
    if (comment.value && !comment.value.startsWith(props.replyPrefix)) {// 删除回复内容视为取消回复
      emit('replayCancel')
    }
  }
})

const msg = ['删除评论', '发布', '回复']

const emit = defineEmits(['postSuccess', 'postFail', 'replayCancel'])
const postComment = async () => {
  if (!user.isLogin) {
    emitter.emit('openLogin')
  } else {
    const res = await doComment({
      t: props.send,
      type: props.commentType,
      id: props.id,
      content: comment.value,
      commentId: props.commentId
    })
    if (res.code !== 200) {
      emit('postFail')
      ElMessage(msg[props.send] + '失败')
    } else {
      emit('postSuccess')
      ElNotification({
        title: 'Success',
        message: msg[props.send] + '成功',
        type: 'success'
      })
    }
  }
}
</script>

<template>
  <div class="comment-input-wrapper">
    <el-input
        v-model="comment"
        type="textarea"
        :row="4"
        style="width: 100%;"
        maxlength="140"
        show-word-limit>
    </el-input>
    <div class="btn-group clearfix">
      <button class="no-btn">
        <svg-icon name="pound" class-name="font-20" vertical="-0.25"></svg-icon>
      </button>
      <button class="no-btn">
        <svg-icon name="at-sign" class-name="font-20" vertical="-0.25"></svg-icon>
      </button>
      <button class="no-btn">
        <svg-icon name="smile" class-name="font-20" vertical="-0.25"></svg-icon>
      </button>
      <button class="cir-btn-white" @click.stop="postComment">评论</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.comment-input-wrapper {

  .btn-group {
    margin-top: 5px;

    .no-btn {
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
      padding: 0 10px 0 0;
    }

    .cir-btn-white {
      float: right;
    }
  }
}
</style>