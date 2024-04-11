<script setup>
import {defineProps} from "vue"
import {dateTimeFormat} from '@/utils/DateUtil.js'
import SvgIcon from "@/components/svg/SvgIcon.vue";

defineProps({
  comment: {
    require: true,
    type: Object
  }
})


</script>

<template>
  <div class="comment-wrapper clearfix">
    <img v-lazy="comment.user.avatarUrl + '?param=100y100'">
    <div class="comment-content">
      <div class="content-block"><span style="color: #0077aa">{{ comment.user.nickname }} : </span>{{ comment.content }}
      </div>
      <div v-if="comment.beReplied && comment.beReplied.length" class="replied-content content-block"><span
          style="color: #0077aa">@{{ comment.beReplied[0].user.nickname }} : </span>{{ comment.beReplied[0].content }}
      </div>
      <div class="content-block">
        <span>{{ dateTimeFormat(comment.time) }}</span>
        <div class="button-wrapper">
          <button>举报</button>
          <button>
            <svg-icon name="thumbs-up"></svg-icon>
            {{ comment.likedCount }}
          </button>
          <button>
            <svg-icon name="share"></svg-icon>
          </button>
          <button>
            <svg-icon name="comment"></svg-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.comment-wrapper {
  padding: 15px 0;
  display: flex;
  border-bottom: 1px solid @border;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    //float: left;
  }

  .comment-content {
    width: 100%;
    margin-left: 10px;
    font-size: 12px;
    //float: left;
    .replied-content {
      display: block;
      background-color: @grey57;
      border-radius: 5px;
      margin: 5px 0;
      line-height: 30px;
      vertical-align: middle;
    }

    .button-wrapper {
      margin-right: 5px;
      float: right;

      button {
        background-color: white;
        border: none;
        border-right: 1px solid @border;
      }
    }
  }

  .content-block {
    line-height: 20px;
  }
}
</style>