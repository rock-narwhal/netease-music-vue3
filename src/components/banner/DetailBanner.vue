<script setup>
import {defineProps} from 'vue'

defineProps({
  avatar: {
    require: true,
    type: String
  }
})

</script>

<template>
  <div class="banner">
    <img v-lazy="avatar + '?param=400y400'" alt="">
    <div class="banner-info">
      <!--        标题区域-->
      <slot name="title"></slot>
      <!--      按钮区域  -->
      <slot name="buttons"></slot>
      <!--        其他信息-->
      <slot name="others"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";
.banner {
  display: flex;

  img {
    width: 180px;
    border: 1px solid @greyF2;
    border-radius: 5px;
  }

  .banner-info {
    margin-left: 30px;
  }
}
</style>