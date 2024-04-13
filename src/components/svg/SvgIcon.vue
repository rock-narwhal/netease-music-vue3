<script setup>
import {computed} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String
  },
  /**
   * 图标垂直调整
   * 建议字体大小和vertical-align值关系
   * 20px   -0.25em
   * 18px   -0.2em
   * 16px   -0.15em
   * 其他    -0.125em
   */
  vertical:{
    type: String,
    default: '-0.125'
  }
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})

const svgClass = computed(() => {
  return `svg-icon ` + (props.className || '')
})

const verticalAlign = computed(() => {
  return props.vertical + 'em'
})
</script>

<template>
  <svg aria-hidden="true" :class="svgClass" :style="{'vertical-align': verticalAlign}">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  //line-height: 30px;
  line-height: 2em;
  //overflow: hidden;
}
</style>