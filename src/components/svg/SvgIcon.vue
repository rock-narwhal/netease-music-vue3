<script setup>
import {computed} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String
  }
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})

const svgClass = computed(() => {
  return `svg-icon ` + (props.className || '')
})

const verticalAlign = computed(() => {
  if(!props.className) return '-0.125em'
  if (props.className.includes('font-20')) {
    return '-0.25em'
  } else if (props.className.includes('font-18')) {
    return '-0.2em'
  } else if (props.className.includes('font-16')) {
    return '-0.15em'
  }else if(props.className.includes('font-12')){
    return '-0.25em'
  }else{
    return '-0.125em'
  }
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
  line-height: 30px;
  //line-height: 2em;
  overflow: hidden;
}
</style>