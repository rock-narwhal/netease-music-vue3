<script setup>
import {computed} from 'vue'

const props = defineProps({
  tag: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ec4141'
  },
  size: {
    type: String,
    default: 'small',
    validator: (val) => ['small', 'middle', 'large'].includes(val)
  }
})

const styleObj = computed(() => {
  if(props.size === 'small'){
    return {
      lineHeight: '12px',
      color: props.color,
      border: '1px solid ' + props.color,
      fontSize: '10px',
      padding: '0 2px',
      borderRadius: '3px'
    }
  }else if(props.size === 'middle'){
    return {
      lineHeight: '12px',
      color: props.color,
      border: '1px solid ' + props.color,
      fontSize: '10px',
      padding: '0 2px',
      borderRadius: '3px'
    }
  }else{
    return {
      lineHeight: '18px',
      color: props.color,
      border: '1px solid ' + props.color,
      fontSize: '14px',
      padding: '0 4px',
      borderRadius: '3px'
    }
  }
})
</script>

<template>
  <div class="song-tag-wrapper" :style="styleObj">
    {{ tag }}<slot></slot>
  </div>
</template>

<style scoped lang="less">
.song-tag-wrapper {
  outline: 0;
  box-sizing: border-box;
  display: inline-block;
  background-color: transparent;
}
</style>