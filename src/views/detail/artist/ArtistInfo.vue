<script setup>
import {reactive, onMounted, computed} from "vue";
import {useRoute} from "vue-router";
import {artistDesc} from "@/api/api_artist.js";

const queryInfo = reactive({
  id: ''
})

const artistInfo = reactive({
  briefDesc: '',
  introduction: []
})

const route = useRoute()
onMounted(async () => {
  queryInfo.id = route.query.id || ''
  if (queryInfo.id) {
    const res = await artistDesc(queryInfo.id)
    if (res.code !== 200) return
    artistInfo.briefDesc = res.briefDesc
    artistInfo.introduction = res.introduction
    artistInfo.introduction = artistInfo.introduction.map(item => {
      let text = item.txt
      let arr = text.split('\n').map(part => {
        return `<p class="content">${part}</p>`
      })
      return {ti: item.ti, txt: arr.join('')}
    })
  }
})

const infoContent = computed(() => {
  let text = ''
  text += '<p class="title">简介</p>'
  artistInfo.briefDesc.split('\n').forEach(part => {
    text += `<p class="content">${part}</p>`
  })
  artistInfo.introduction.forEach(intro => {
    text += `<p class="title">${intro.ti}</p>`
    intro.txt.split('\n').forEach(p => {
      text += `<p class="content">${p}</p>`
    })
  })
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