<script setup>
import {computed, onMounted, ref} from 'vue'
import {albumDetail} from "@/api/api_music.js";
import {useRoute} from "vue-router";

const route = useRoute()

const desc = ref('')
onMounted(async () => {
  const id = route.query.id
  if (id) {
    const res = await albumDetail(id)
    if (res.code !== 200) return
    desc.value = res.album.description
  }
})

const infoContent = computed(() => {
  let text = ''
  text += '<p class="title">专辑介绍</p>'
  if (desc.value) {
    desc.value.split('\n').forEach(line => {
      if (line) {
        text += `<p class="content">${line}</p>`
      }
    })
  } else {
    text += '<p class="content">暂无简介</p>'
  }

  return text
})
</script>

<template>
  <div class="info-wrap" v-html="infoContent">
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine";

.info-wrap {
  padding: 0 30px;

  /deep/ .title {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  /deep/ .content {
    text-indent: 2em;
    line-height: 200%;
    white-space: pre-wrap;
    color: @listDark;
  }
}
</style>