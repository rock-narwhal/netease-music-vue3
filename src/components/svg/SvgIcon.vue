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
</script>

<template>
  <svg aria-hidden="true" :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style>

</style>