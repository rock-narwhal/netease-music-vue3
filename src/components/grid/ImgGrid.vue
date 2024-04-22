<script setup>

import {computed} from "vue";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import ImgCover from "@/components/commons/ImgCover.vue";

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  hasMore: {
    type: Boolean,
    default: false
  },
  infinite: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true,
    validator : (val) => ['artist','playlist','album'].includes(val)
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  btnSize: {
    type: String,
    default: 'large'
  }
})

// 禁用无限滚动
const disabled = computed(() => {
  return !props.infinite || !props.hasMore || props.isLoading
})
// 显示播放按钮
const showPlayBtn = computed(() => {
  return props.type === 'playlist' || props.type === 'album'
})

const emit = defineEmits(['loadMore', 'clickImg', 'clickPlay'])
//向父组件发送加载请求
const load = () => {
  if (props.hasMore) {
    emit('loadMore', props.list.length)
  }
}
const clickImg = (id) => {
  emit('clickImg', id)
}
const clickPlay = (id) => {
  emit('clickPlay', id)
}
// 播放次数
const playCount = (count) => {
  if (count < 10000) return count
  return Math.floor(count / 10000) + '万'
}

const picUrl = (item) => {
  if (props.type === 'playlist') {
    let url = item.picUrl ? item.picUrl : item.coverImgUrl
    if (!url) {
      return ''
    }
    let ind = url.indexOf('?')
    if (ind > 0) {
      url = url.substring(0, ind)
    }
    url += '?param=400y400'
    return url
  } else if (props.type === 'artist') {
    return `${item.img1v1Url}?param=400y400`
  } else if (props.type === 'album') {
    return `${item.picUrl}?param=400y400`
  }
  return ''
}
</script>

<template>

  <ul class="img-ul"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      infinite-scroll-delay="300">
    <li class="img-li mar-bot-20" v-for="item in list" :key="item.id">
      <img-cover :src="picUrl(item)"
                 :btn-size="btnSize"
                 @click-img="clickImg(item.id)"
                 @click-btn="clickPlay(item.id)"
                 :show-type="showPlayBtn ? 'hover' : 'none'"
                 :btn-pos="type === 'album' ? 'center' : 'right-bottom'">
        <div class="video-play-count font-12" v-if="item.playCount">
          <svg-icon name="play-fill" class-name="font-14" vertical="-0.2"></svg-icon>
          {{ playCount(item.playCount) }}
        </div>
      </img-cover>
      <slot :item="item"></slot>
    </li>
  </ul>
  <div class="loading-wrap" v-show="isLoading">
    <i class="el-icon-loading"></i>加载中
  </div>
  <div class="loading-wrap" v-if="infinite && !hasMore">没有更多了</div>

</template>

<style scoped lang="less">
.img-ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 10px;
  column-gap: 25px;
}

.video-play-count {
  color: white;
  text-shadow: 0 0 2px #000;
}

.loading-wrap {
  font-size: 16px;
  height: 50px;
  text-align: center;
}
</style>