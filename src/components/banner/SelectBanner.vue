<script setup>
import {ref, defineEmits} from 'vue'

const list = ref([
  {
    title: '语种:',
    queryKey: 'area',
    option: [{name: '全部', val: -1}, {name: '华语', val: 7}, {name: '欧美', val: 96}, {name: '日本', val: 8},
      {name: '韩国', val: 16}, {name: '其他', val: 0}]
  },
  {
    title: '分类:',
    queryKey: 'type',
    option: [{name: '全部', val: -1}, {name: '男歌手', val: 1}, {name: '女歌手', val: 2}, {name: '乐队组合', val: 3}]
  },
  {
    title: '筛选:',
    queryKey: 'initial',
    option: [{name: '热门', val: -1}, {name: 'A', val: 'a'}, {name: 'B', val: 'b'}, {name: 'C', val: 'c'},
      {name: 'D', val: 'd'}, {name: 'E', val: 'e'}, {name: 'F', val: 'f'}, {name: 'G', val: 'g'},
      {name: 'H', val: 'h'}, {name: 'I', val: 'i'}, {name: 'J', val: 'j'}, {name: 'K', val: 'k'},
      {name: 'L', val: 'l'}, {name: 'M', val: 'm'}, {name: 'N', val: 'n'}, {name: 'O', val: 'o'},
      {name: 'P', val: 'p'}, {name: 'Q', val: 'q'}, {name: 'R', val: 'r'}, {name: 'S', val: 's'},
      {name: 'T', val: 't'}, {name: 'U', val: 'u'}, {name: 'V', val: 'v'}, {name: 'W', val: 'w'},
      {name: 'X', val: 'x'}, {name: 'Y', val: 'y'}, {name: 'Z', val: 'z'}, {name: '#', val: '0'}]
  }
])

const queryParam = ref({
  type: -1,
  area: -1,
  initial: -1,
  offset: 0
})

const emit = defineEmits(['clickOption'])
const clickOpt = (key, val) => {
  if (queryParam.value[key] === val) return

  queryParam.value[key] = val
  emit('clickOption', queryParam.value)
}
</script>

<template>
  <div class="selector-container">
    <div v-for="item in list" :key="item.title">
      <div class="title">
        {{ item.title }}
      </div>
      <ul>
        <li v-for="opt in item.option"
            :key="opt.val"
            class="opt-btn pointer"
            :class="{active: opt.val === queryParam[item.queryKey]}"
            @click="clickOpt(item.queryKey, opt.val)">
          {{ opt.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.selector-container {
  .title {
    float: left;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-left: 15px;
      width: 60px;
      margin-bottom: 5px;
      text-align: center;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
    }

    li.active {
      color: @headRed;
      background-color: #ffeeee;
    }
  }
}
</style>