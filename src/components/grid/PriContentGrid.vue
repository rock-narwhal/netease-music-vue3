<script setup>

import PrivateMvCard from "@/components/card/PrivateMvCard.vue";
import {computed} from "vue";

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

const emit = defineEmits(['clickMv', 'loadMore'])

const disabled = computed(() => {
  return !props.infinite || !props.hasMore || props.isLoading
})

const loadMore = () => {
  emit('loadMore')
}
</script>

<template>
  <div class="mv-grid-wrapper">
    <div v-for="item in list"
         :key="item.id"
         v-infinite-scroll="loadMore"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-delay="300"
         class="mar-bot-20">
      <private-mv-card :mv-data="item" @click-card="emit('clickMv', item.id)"></private-mv-card>
      <div class="dark-color mar-top-10">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mv-grid-wrapper{
  width: 100%;
  display: grid;
  column-gap: 20px;
  // 网格布局
  grid-template-columns: repeat(auto-fill,minmax(265px, 1fr));
}
</style>