<script setup>

defineProps({
  option: {
    type: Array,
    require: true
  }
})

const emit = defineEmits(['clickTab'])

const clickTab = (type) => {
  emit('clickTab', type)
}
</script>

<template>
  <div class="outer">
    <ul>
      <li class="pointer"
          :class="{active: item.active}"
          v-for="item in option"
          :key="item.type"
          @click="clickTab(item.type)">{{ item.name }}
      </li>
    </ul>
    <div>
      <slot name="rightBtn"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.outer{
  display: flex;
  justify-content: space-between;
  ul{
    height: 100%;
    line-height: 100%;
    display: flex;
    li{
      padding: 0 10px;
    }
  }
  .active{
    font-weight: bold;
  }
}
</style>