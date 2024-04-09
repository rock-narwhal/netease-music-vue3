<script setup>
import {ref} from 'vue'
import {getHotSearch, getSuggest} from "@/api/api_other.js";
import {useRouter} from "vue-router";
import {Search} from '@element-plus/icons-vue'

const keywords = ref('')

let timer = 0
//搜索栏输入关键字，弹出搜索建议
const handleInput = (val) => {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    searchSuggest(val)
  })
}

//搜索建议
const suggestInfo = ref({})
// 获取搜索建议
const searchSuggest = async (val) => {
  if (!val) return
  const res = await getSuggest({keywords: val})
  if (res.code !== 200) return
  suggestInfo.value = res.result
}

// 是否展示搜索弹窗
const showInfoTip = ref(false)
//热搜内容
const hotList = ref([])
const hotSearch = async () => {
  showInfoTip.value = true
  if (keywords.value) {
    await searchSuggest(keywords.value)
  }
  if (hotList.value.length > 0) return
  const res = await getHotSearch()
  if (res.code !== 200) return
  hotList.value = res.data
}

const router = useRouter()
const searchInput = ref(null)
//跳转到搜索页
const toSearch = () => {
  if (!keywords.value) return
  searchInput.value.blur()
  router.push(`/search/songs?keywords=${encodeURIComponent(keywords.value)}`)
  setHistory(keywords.value)
}

//搜索历史
const searchHis = ref([])
//搜索词添加到搜索历史
const setHistory = (val) => {
  if (val) {
    if (searchHis.value.find(item => item === val)) {
      return
    }
    searchHis.value.unshift(val)
    searchHis.value = searchHis.value.slice(0, 5)
    window.localStorage.setItem('searchHis', JSON.stringify(searchHis.value))
  }
}
</script>

<template>
  <div class="search-bar">
    <div class="search-input">
      <el-input style="width: 200px"
                placeholder="搜索"
                v-model="keywords"
                ref="searchInput"
                :prefix-icon="Search"
                @input="handleInput"
                clearable
                @focus="hotSearch"
                @blur="showInfoTip = false"
                @keyup.enter.native="toSearch">
      </el-input>
    </div>
    <transition name="el-fade-in">
      <!--          搜索栏下的弹窗-->
      <div class="search-info-tip" v-show="showInfoTip">
        <!--        搜索历史和热搜组件-->

        <!--        搜索建议组件-->
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine";
.search-bar {
  width: 100%;
  height: 100%;
  position: relative;

  .search-input {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>