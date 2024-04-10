<script setup>
import {defineProps, defineEmits} from 'vue'
import {timeConvert} from "@/utils/DateUtil.js";

defineProps({
  titles: {
    type: Array,
    require: true
  },
  dataList: {
    type: Array,
    require: true
  }
})

const emit = defineEmits(['dbClick'])
const dbClick = (id) => {
  emit('dbClick', id)
}
</script>

<template>
  <div class="music-list-wrapper">
    <ul class="title-bar flex-box">
      <li v-for="item in titles" :key="item.val" :style="{width:item.width}">
        {{ item.val }}
      </li>
    </ul>
    <ul class="music-list flex-box" v-for="(item,index) in dataList" :key="item.id" @dblclick="dbClick(item.id)">
      <li :style="{width:titles[0].width}">
        <span>
          {{ index < 9 ? '0' + (index + 1) : (index + 1) }}
        </span>
        <svg-icon name="like" class="pointer"></svg-icon>
        <svg-icon name="download-one" class="pointer"></svg-icon>
      </li>
      <li :style="{width:titles[1].width}">{{ item.name }}</li>
      <li :style="{width:titles[2].width}">{{ item.ar[0].name }}</li>
      <li :style="{width:titles[3].width}">{{ item.al.name }}</li>
      <li :style="{width:titles[4].width}">{{ timeConvert(item.dt) }}</li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.flex-box {
  display: flex;
}

ul {
  width: 100%;
  height: 36px;

  li {
    line-height: 36px;

    button {
      background-color: transparent;
      border: none;
      font-size: 16px;
    }
  }
}

.music-list:nth-child(even) {
  background: @grey57;
}
</style>