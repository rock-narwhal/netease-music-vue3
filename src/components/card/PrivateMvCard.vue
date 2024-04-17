<script setup>
import SvgIcon from "@/components/svg/SvgIcon.vue";

defineProps({
  mvData: {
    type: Object,
    required: true
  },
  width: {
    type: String,
    default: '350px'
  },
  height: {
    type: String,
    default: '200px'
  }
})

const emit = defineEmits(['clickCard'])
</script>

<template>
  <div class="card-wrapper" :style="{width,height}" @click="emit('clickCard')">
    <img :src="`${mvData.picUrl}`" alt="">
    <!--    <div class="img-cover" :style="{backgroundImage: `url(${mvData.picUrl}?param=520y300)`}"></div>-->
    <div class="card-btn">
      <svg-icon name="play-fill"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
.card-wrapper {
  position: relative;

  img {
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
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