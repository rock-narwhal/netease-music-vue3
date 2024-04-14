<script setup>
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  menuList:{
    type:Array,
    required: true
  },
  mode:{
    type: String,
    default: 'route', // menu/route
  },
  query:{

  }
})

const router = useRouter()
const toSub = (index) => {
  router.push({
    name: props.menuList[index].name,
    query: props.query
  })
}
const route = useRoute()
const active = (path) =>{
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="menu-wrap">
    <div v-for="(item, index) in menuList"
         :key="index"
         @click="toSub(index)"
         class="pointer menu-item"
         :class="{active: active(item.path)}"
    >
      <div v-if="mode === 'route'">{{ item.title }}</div>
      <div v-else >{{ item }}</div>
      <div class="bot-bar"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";
.menu-wrap{
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  .menu-item{
    margin-right: 20px;
    font-size: 16px;
    height: 21px;
    line-height: 21px;
    .bot-bar{
      width: 100%;
      height: 4px;
      background-color: @headRed;
      border-radius: 2px;
      display: none;
    }
  }
  .active{
    font-size: 20px;
    font-weight: bold;
    .bot-bar{
      display: block;
    }
  }
}
</style>