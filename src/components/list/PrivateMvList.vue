<script setup>
import {computed} from "vue";
import PrivateMvCard from "@/components/card/PrivateMvCard.vue";

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
// 独家发送
</script>

<template>
  <div class="mv-list-wrapper">
    <div v-for="item in list"
         :key="item.id"
         v-infinite-scroll="loadMore"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-delay="300"
         class="mar-bot-20">
      <private-mv-card :mv-data="item" @click-card="emit('clickMv', item.id)"></private-mv-card>
      <div class="font-12 dark-color mar-top-10 text-over" style="width: 350px">{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mv-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>