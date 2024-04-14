<script setup>
import {computed} from 'vue'

const props = defineProps({
  tag:{
    type: String,
    required: true
  },
  color:{
    type: String,
    default: '#ec4141'
  },
  height:{
    type: String,
    default: '12px'
  }
})

const styleObj = computed(() => {
  return{
    height: props.height,
    lineHeight: props.height,
    color: props.color,
    border: '1px solid ' + props.color,
    fontSize: '10px',
    padding: '0 1px',
  }
})
</script>

<template>
<button class="song-tag-wrapper" :style="styleObj">
  {{tag}}<slot></slot>
</button>
</template>

<style scoped lang="less">
.song-tag-wrapper{
  cursor: default;
  outline: 0;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>