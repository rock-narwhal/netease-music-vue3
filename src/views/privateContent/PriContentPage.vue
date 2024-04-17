<script setup>
import {onMounted, ref, reactive} from 'vue'
import PrivateMvList from "@/components/list/PrivateMvList.vue";
import {priContentList} from "@/api/api_other.js";
import SvgIcon from "@/components/svg/SvgIcon.vue";

const queryInfo = reactive({
  limit: 15,
  offset: 0
})

const contents = ref([])

const isLoading = ref(false)

const hasMore = ref(false)

onMounted(() => {
  contents.value = []
  queryInfo.offset = 0
  loadContent()
})

const loadContent = async () => {
  isLoading.value = true
  const res = await priContentList(queryInfo)
  if (res.code !== 200) {
    isLoading.value = false
    return
  }
  contents.value.push(...res.result)
  hasMore.value = res.more
  queryInfo.offset = res.offset
  isLoading.value = false
}
//
// const loadMoreContent = async () =>{
//   queryInfo.offset += 15
//   await loadContent()
// }
</script>

<template>
  <div class="content-wrap">
    <div class="space-wrap"></div>
    <div class="content-area">
      <h2 class="font-20 font-bold pointer mar-bot-15">
        独家放送
      </h2>
      <private-mv-list :list="contents"
                       :is-loading="isLoading"
                       :infinite="true"
                       :has-more="hasMore"
                       @load-more="loadContent"
      ></private-mv-list>
    </div>
    <div class="space-wrap"></div>
  </div>
</template>

<style scoped lang="less">
.content-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.content-area {
  margin-top: 30px;
  width: 1100px;
  box-sizing: border-box;
}

.space-wrap {
  flex-shrink: 1;
  min-width: 30px;
}
</style>