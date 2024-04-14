<script setup>
import {computed} from 'vue'
import SvgIcon from "@/components/svg/SvgIcon.vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  showType: {
    type: String,
    default: 'hover',
    validator: (value) => ['hover', 'always', 'none'].includes(value)
  },
  btnPos: {
    type: String,
    default: 'right-bottom',
    validator: (value) => ['center', 'right-bottom'].includes(value)
  },
  btnSize: {
    type: String,
    default: 'large',
    validator: (value) => ['small', 'middle', 'large'].includes(value)
  },
  radius: {
    type: String,
    default: '5px'
  },
  size:{ //指定大小 npx 或者 100%
    type:String,
    default: '200px'
  }
})

const btnClass = computed(() => {
  if (props.showType === 'hover') {
    return 'btn-' + props.btnPos + ' btn-' + props.btnSize + ' hover-btn'
  } else if(props.showType === 'always') {
    return 'btn-' + props.btnPos + ' btn-' + props.btnSize
  }else{
    return 'btn-none'
  }
})

const iconStyle = computed(() => {
  if (props.btnSize === 'large') {
    return {font: 'font-28', vertical: '-0.3'}
  }
  if (props.btnSize === 'middle') {
    return {font: 'font-20', vertical: '-0.25'}
  }
  if (props.btnSize === 'small') {
    return {font: 'font-20', vertical: '-0.35'}
  }
})
const emit = defineEmits(['clickImg', 'clickBtn'])

const coverStyle =  computed(() =>{
  if(props.size === '100%'){
    return {}
  }else{
    return {width: props.size, height: props.size}
  }
})
</script>

<template>
  <div class="img-cover-wrapper clearfix" :style="coverStyle" @click="emit('clickImg')">
    <img v-lazy="src" :style="{borderRadius: radius}">
    <div class="right-top-area">
      <slot></slot>
    </div>
    <div v-if="props.btnPos === 'center'" class="center-wrapper">
      <div class="btn-wrapper" :class="btnClass" @click.stop="emit('clickBtn')">
        <svg-icon name="play-fill" :class-name="iconStyle.font" :vertical="iconStyle.vertical"></svg-icon>
      </div>
    </div>
    <div v-else class="btn-wrapper" :class="btnClass" @click.stop="emit('clickBtn')">
      <svg-icon name="play-fill" :class-name="iconStyle.font" :vertical="iconStyle.vertical"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";
.img-cover-wrapper {
  position: relative;

  img {
    height: 100%;
    width: 100%;
    border: 1px solid @greyEF;
  }

  .right-top-area {
    position: absolute;
    top: 10px;
    right: 10px;
    text-shadow: 0 0 2px #000;
  }

  .center-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-wrapper {
    background-color: white;
    text-align: center;
    border-radius: 50%;
    color: @headRed;
  }

  .btn-right-bottom {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .btn-small {
    height: 24px;
    width: 24px;
    line-height: 20px;
  }

  .btn-middle {
    height: 30px;
    width: 30px;
    line-height: 30px;
  }

  .btn-large {
    height: 40px;
    width: 40px;
    line-height: 40px;
  }

  .hover-btn {
    transition: all 0.5s;
    opacity: 0.0;
  }

  &:hover .hover-btn {
    display: block;
    opacity: 1.0;
  }

  .btn-none{
    display: none;
  }
}
</style>