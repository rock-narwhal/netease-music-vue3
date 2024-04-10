<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps(['title', 'catList', 'clickTitle', 'clickTag'])

const configs = ref([
  {
    title: '语种',
    icon: 'icon-diqiuquanqiu'
  },
  {
    title: '风格',
    icon: 'icon-fengge'
  },
  {
    title: '场景',
    icon: 'icon-xiazai47'
  },
  {
    title: '情感',
    icon: 'icon-smiling'
  },
  {
    title: '主题',
    icon: 'icon-zhuti'
  }
])

const onTitleCLick = () => {
  props.clickTitle || props.clickTitle()
}

const onTagClick = (name) => {
  props.clickTag(name)
}
</script>

<template>
  <div class="cat-container">
    <div class="header-title" @click.stop="onTitleCLick">{{ title }}</div>
    <div class="cat-group" v-for="(catGroup,index) in catList" :key="index">
      <div class="group-title">
        <i class="iconfont font-24" :class="configs[index].icon"></i>
        <span class="mleft-6">{{ configs[index].title }}</span>
      </div>
      <div class="cat-list font-14">
        <div v-for="item in catGroup"
             :key="item.name"
             class="tag-item pointer"
             :class="{active: item.isActive}"
             @click.stop="onTagClick(item.name)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.cat-container {
  height: 650px;
  width: 720px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 4px #dddddd;
  text-align: left;

  .header-title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: 1px solid #e0e0e0;
  }

  .cat-group {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 20px 0 20px;
    justify-content: space-between;
    //TODO 图标大小调节
    .cat-list {
      width: 550px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;

      .tag-item {
        width: 90px;
        height: 30px;

        &:hover {
          color: @headRed;
        }
      }
    }
  }
}
</style>