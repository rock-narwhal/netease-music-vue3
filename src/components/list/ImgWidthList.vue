<script setup>
import {defineProps, computed, defineEmits} from 'vue'

const props = defineProps({
  list: {
    require: true,
    type: Array
  },
  mode: {
    default: 'ar', // ar 歌手  al 专辑  pl 歌单   dj 播客   vo  声音
  },
  hasMore: {
    type: Boolean,
    default: false
  },
  infinite: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  coverWidth: {
    default: 50,// 左侧封面加名称
    type: Number
  }
})

const disabled = computed(() => {
  return !props.infinite || !props.hasMore || props.isLoading
})
const emit = defineEmits(['loadMore', 'clickItem'])
const load = () => {
  if (props.hasMore) {
    emit('loadMore', props.list.length)
  }
}

const clickItem = (id) => {
  emit('clickItem', id)
}

const getCoverImg = (item) => {
  let url = ''
  switch (props.mode) {
    case 'ar':
      url = item.picUrl
      break
    case 'al':
      url = item.picUrl
      break
    case 'pl':
      url = item.coverImgUrl
      break
  }
  return url + '?param=100y100'
}
</script>

<template>
  <ul>
    <li v-for="item in list"
        :key="item.id"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
    >
      <div @click="clickItem(item.id)" class="clearfix container">
        <div class="img-wrap float-item" :style="{'width': `${coverWidth}%`}">
          <img v-lazy="getCoverImg(item)" alt="">
          {{ item.name }}
        </div>
        <div class="float-item clearfix" :style="{'width': `${100 - coverWidth}%`}">
          <slot :scope="item"></slot>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";
ul {
  li {
    padding: 0 30px;
    &:nth-child(odd) {
      background-color: @grey57;
    }
  }
}

.container {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;

  .img-wrap {
    height: 60px;
    line-height: 60px;

    img {
      height: 60px;
      margin-right: 10px;
      vertical-align: middle;
      border-radius: 5px;
    }
  }

  .float-item {
    float: left;
  }
}
</style>