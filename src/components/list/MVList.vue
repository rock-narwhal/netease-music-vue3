<script setup>
import {computed} from 'vue'
import {toCNNum} from "@/utils/FormatUtil.js";
import {timeConvert} from "@/utils/DateUtil.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  infinite: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const disabled = computed(() => {
  return !props.infinite || !props.hasMore || props.isLoading
})

const emit = defineEmits(['loadMore'])
const load = () => {
  if (props.hasMore) {
    emit('loadMore', props.list.length)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list"
        :key="item.id"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
        class="pointer">
      <img v-lazy="item.imgurl16v9 + '?param=600y400'" alt="">
      <button class="play-count">
        <svg-icon name="play-fill" class-name="font-18" vertical="-0.2"></svg-icon>
        {{ toCNNum(item.playCount) }}
      </button>
      <button class="duration">{{ timeConvert(item.duration) }}</button>
      <div class="album-name">{{ item.name }}</div>
    </li>
  </ul>
</template>

<style scoped lang="less">
ul {

  width: 100%;
  display: grid;
  column-gap: 20px;
  row-gap: 30px;
  // 网格布局
  grid-template-columns: repeat(auto-fill,minmax(265px, 1fr));

  li {
    //width: 19%;
    width: 100%;
    position: relative;

    img {
      border-radius: 5px;
      width: 1fr;
      aspect-ratio: 1.77;
      object-fit: cover;
    }

    button {
      border: none;
      background: transparent;
      color: white;
    }

    .play-count {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .duration {
      position: absolute;
      bottom: 35px;
      right: 10px;
    }

    .album-name {
      height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>