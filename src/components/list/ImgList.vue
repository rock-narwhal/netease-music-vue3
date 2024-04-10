<script setup>
import {defineProps, computed, defineEmits} from 'vue'

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
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
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
  <div class="img-list">
    <ul class="img-ul"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
    >
      <li class="img-li" v-for="item in list" :key="item.id">
        <div class="img-wrap pointer" @click="clickImg(item.id)">
          <img class="img img-radius-8 img-border" v-lazy="picUrl(item)">
          <div class="video-playcount font-12" v-if="item.playCount">
            <i class="iconfont font-12 icon-24gl-play"></i>
            {{ playCount(item.playCount) }}
          </div>
          <div v-if="showPlayBtn" class="play-btn pointer" @click.stop="clickPlay(item.id)">
            <i class="iconfont font-16 icon-bofang"></i>
          </div>
        </div>
        <slot :item="item"></slot>
      </li>
    </ul>
    <div class="loading-wrap" v-show="isLoading">
      <i class="el-icon-loading"></i>加载中
    </div>
    <div class="loading-wrap" v-if="infinite && !hasMore">没有更多了</div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.img-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .img-li {
    margin-bottom: 30px;
    width: 18%;
  }
}

.img-wrap {
  position: relative;

  .video-playcount {
    color: #ffffff;
    position: absolute;
    right: 10px;
    top: 10px;
    text-shadow: 0 0 2px #000;
  }

  .play-btn {
    position: absolute;
    right: 15px;
    bottom: 15px;
    background-color: @grey57;
    //background-color: #fbf7f6;
    color: @headRed;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s;
  }

  &:hover .play-btn {
    opacity: 1;
  }
}

.loading-wrap {
  font-size: 16px;
  height: 50px;
  text-align: center;
}
</style>