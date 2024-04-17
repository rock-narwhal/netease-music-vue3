<script setup>
import SvgIcon from "@/components/svg/SvgIcon.vue";

defineProps({
  mvData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['clickCard'])
</script>

<template>
  <div class="card-wrapper" @click="emit('clickCard')">
    <img :src="`${mvData.picUrl}`" alt="">
    <div class="card-btn">
      <svg-icon name="play-fill"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  position: relative;
  width: 100%;

  img {
    border-radius: 5px;
    display: block;
  }

  .card-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>