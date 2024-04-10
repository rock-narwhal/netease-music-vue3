<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from "vue-router"
import {Search} from '@element-plus/icons-vue'
import HisAndHot from '@/components/layout/header/HisAndHot.vue'
import SearchSuggest from '@/components/layout/header/SearchSuggest.vue'

const keywords = ref('')

// 是否展示搜索弹窗
const showInfoTip = ref(false)

const router = useRouter()
const searchInput = ref(null)
//跳转到搜索页
const toSearch = () => {
  if (!keywords.value) return
  searchInput.value.blur()
  router.push({
    name:'SearchPage',
    query:{
      keywords: encodeURIComponent(keywords.value)
    }
  })
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
const deleteHis = (val) => {
  if (val) {
    searchHis.value = searchHis.value.filter(item => item !== val)
  } else {//没传参删除所有
    searchHis.value = []
  }
  window.localStorage.setItem('searchHis', JSON.stringify(searchHis.value))
}
onMounted(() => {
  let history = window.localStorage.getItem('searchHis');
  if (!history) return
  searchHis.value = JSON.parse(history) || []
})

const searchSuggestRef = ref(null)
const handleInput = () =>{
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
                @focus="showInfoTip = true"
                @blur="showInfoTip = false"
                @keyup.enter.native="toSearch">
      </el-input>
    </div>
    <transition name="el-fade-in">
      <!--          搜索栏下的弹窗-->
      <div class="search-info-tip" v-show="showInfoTip">
        <!--        搜索历史和热搜组件-->
        <HisAndHot v-show="keywords === ''"
                   :keywords="keywords"
                   :search-his="searchHis"
                   @deleteHis="deleteHis"></HisAndHot>
        <!--        搜索建议组件-->
        <SearchSuggest ref="searchSuggestRef" v-show="keywords !== ''" :keywords="keywords"></SearchSuggest>
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

  .search-info-tip {
    position: absolute;
    top: 80px;
    left: -70px;
    transition: all 0.5s;
    border-radius: 8px;
    box-shadow: 0 1px 4px #dddddd;
    width: 350px;
    height: 500px;
    color: black;
    overflow-y: auto;
    padding: 10px;
    z-index: 99;
    background-color: white;
  }
}
</style>