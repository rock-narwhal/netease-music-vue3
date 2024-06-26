<script setup>
import {defineModel, ref, reactive, onBeforeMount, watch, computed} from 'vue'

const props = defineProps({
  size: { //进度条长度
    type: Number,
    default: 180
  },
  vertical: { //进度条水平/垂直，默认水平
    type: Boolean,
    default: false
  },
  color: { //进度条和滑块颜色
    type: String,
    default: '#ec4141'
  }
})

const mode = defineModel() // 双向绑定

const sliderWrapperStyle = reactive({})

const sliderRunawayStyle = reactive({})

const sliderBarStyle = reactive({backgroundColor: props.color, height:'', width: ''})

const sliderBtnStyle = reactive({
  left:'',
  bottom:''
})

const emit = defineEmits(['progressChange'])

const progress = ref(0) //进度

const isActive = ref(false)// 是否在滑动

onBeforeMount(() => {
  if (props.vertical) {
    initVerticalStyle()
  } else {
    initHorizontalStyle()
  }
})
const initVerticalStyle = () => {
  sliderWrapperStyle.height = props.size + 'px'
  sliderWrapperStyle.width = '36px'
  sliderWrapperStyle.justifyContent = 'center'

  sliderRunawayStyle.height = '100%'
  sliderRunawayStyle.width = '3px'

  sliderBarStyle.width = '100%'
  sliderBarStyle.height = sliderSize.value
  sliderBarStyle.position = 'absolute'
  sliderBarStyle.bottom = '0'

  sliderBtnStyle.bottom = sliderPosition.value
  sliderBtnStyle.left = '-17px'
}

const initHorizontalStyle = () => {
  sliderWrapperStyle.width = props.size + 'px'
  sliderWrapperStyle.height = '36px'
  sliderWrapperStyle.alignItems = 'center'

  sliderRunawayStyle.width = '100%'
  sliderRunawayStyle.height = '3px'

  sliderBarStyle.height = '100%'
  sliderBarStyle.width = sliderSize.value

  sliderBtnStyle.left = sliderPosition.value
  sliderBtnStyle.top = '-17px'
}

watch(() => props.modelValue, (val) => {
  if (!isActive.value) {
    progress.value = val
  }
})
const sliderSize = computed(() => {
  return progress.value + '%'
})

watch(sliderSize, (val) => {
  if (props.vertical) {
    sliderBarStyle.height = val
  } else {
    sliderBarStyle.width = val
  }
})

const sliderPosition = computed(() => {
  return (-1800 / props.size + progress.value) + '%'
})

watch(sliderPosition, (val) => {
  if (props.vertical) {
    sliderBtnStyle.bottom = val
  } else {
    sliderBtnStyle.left = val
  }
})
// 拖动开始
const mouseDown = () => {
  isActive.value = true
}
// 拖动动作结束
const mouseUp = () => {
  afterChange()
  isActive.value = false
}
// 鼠标开始滑动
const mouseMove = (event) => {
  doChangeProgress(event)
}
// 点击进度条，直接跳到点击位置
const clickSlider = (event) => {
  isActive.value = true
  doChangeProgress(event)
  afterChange()
  isActive.value = false
}

const sliderRunaway = ref(null)
const doChangeProgress = (event) => {
  if (isActive.value) {
    let offset = 0
    if (props.vertical) {
      offset = props.size - (event.clientY - sliderRunaway.value.getBoundingClientRect().y)
    } else {
      offset = event.clientX - sliderRunaway.value.getBoundingClientRect().x
    }
    if (offset < 0) offset = 0
    if (offset > props.size) offset = props.size
    progress.value = (offset) * 100 / props.size
    console.log("offset ", offset, props.size, progress.value)
    // onchangeValue(Math.ceil(progress.value))
  }
}
// 双向绑定更新
// const onchangeValue = (val) => {
//   console.log("onchangeValue ",val)
//   // mode.value = val
// }

// 通知父组件 进度改变
const afterChange = () => {
  if (isActive.value) {
    emit('progressChange', Math.ceil(progress.value))
  }
}
</script>

<template>
  <div class="slider-wrapper" :style="sliderWrapperStyle">
    <div class="slider-runaway" @click="clickSlider" ref="sliderRunaway" :style="sliderRunawayStyle">
      <div class="slider-bar" :style="sliderBarStyle"></div>
      <div class="slider-btn-wrapper" :style="sliderBtnStyle"
           @mousedown.stop="mouseDown"
           @mouseup.stop="mouseUp"
           @mousemove.stop="mouseMove"
           @mouseleave.stop="mouseUp"
           @click.stop="1">
        <div class="slider-button" :style="{backgroundColor: color}"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.slider-wrapper {
  position: relative;
  display: flex;
}

.slider-runaway {
  &:hover {
    height: 5px;
  }

  position: relative;
  //background-color: @grey57;
  background-color: #e0e0e0;

  .slider-bar {
  }

  .slider-btn-wrapper {
    height: 36px;
    width: 36px;
    background-color: transparent;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    .slider-button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: none;
    }

    &:hover .slider-button {
      display: block;
    }
  }
}
</style>