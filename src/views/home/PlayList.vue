<script setup>
import {ref, onMounted} from 'vue'
import {getAllCat, getHighQuality, getHotCat, getPlayListByCat} from "@/api/api_playlist.js";
import emitter from '@/utils/MittBus.js'
import {useRouter} from "vue-router";
import SvgIcon from "@/components/svg/SvgIcon.vue";
import CatList from "@/components/list/CatList.vue";
import ImgList from "@/components/list/ImgList.vue";

const showAllCats = ref(false)

const isLoading = ref(false)

const hasHighQuality = ref(false)

const highInfo = ref({})
const getHighInfo = async (cat) => {
  const res = await getHighQuality(1, cat)
  if (res.code !== 200) return
  hasHighQuality.value = res.playlists.length > 0
  highInfo.value = res.playlists[0] || {}
}

//当前选中标签
const currentTag = ref('华语')

const hotCats = ref([]) //热门标签
onMounted(async () => {
  const res = await getHotCat()
  if (res.code !== 200) return
  hotCats.value = res.tags
  res.tags.forEach(item => {
    item.isActive = item.name === currentTag.value
  })
})

const allCats = ref([]) //所有标签
onMounted(async () => {
  const res = await getAllCat()
  if (res.code !== 200) return
  for (let i = 0; i < 5; i++) {
    allCats.value.push(res.sub.filter(item => item.category === i))
  }
  res.sub.forEach(item => {
    item.isActive = item.name === currentTag.value
  })
})
//切换分类
const changeCat = (name) => {
  if (name === currentTag.value) {
    closeCatList()
    return
  }
  currentTag.value = name
  queryInfo.value.cat = name
  closeCatList()
  queryPlayList()
}
// 关闭、打开 分类列表
const triggerCatList = () => {
  showAllCats.value = !showAllCats.value
}
//关闭分类列表
const closeCatList = () => {
  showAllCats.value = false
}

const playList = ref([]) //歌单列表
onMounted(() => {
  queryPlayList()
})


const queryInfo = ref({
  limit: 50,
  order: 'hot',
  cat: '华语',
  offset: 0
})
const queryPlayList = async () => {
  isLoading.value = true
  await getHighInfo(queryInfo.value.cat)
  const res = await getPlayListByCat(queryInfo.value)
  if (res.code !== 200) return
  playList.value = res.playlists
  pageInfo.value.total = res.total
  isLoading.value = false
}

const pageInfo = ref({
  total: 0,
  currentPage: 1
})
const onPageChange = (page) => {
  if (page === pageInfo.value.currentPage) return
  pageInfo.value.currentPage = page
  queryInfo.value.offset = (page - 1) * queryInfo.value.limit
  queryPlayList()
  emitter.emit('contentScrollTop')
}

const router = useRouter()
const toPlaylistDetail = (id) => {
  router.push({
    name: 'PlaylistDetail',
    query: {
      id
    }
  })
}
</script>

<template>
  <!--  歌单页面-->
  <div class="container">
    <!--    精品歌单banner-->
    <div class="banner" v-if="hasHighQuality">
      <img class="img-back" :src="highInfo.coverImgUrl">
      <img class="img-front img-80" v-lazy="highInfo.coverImgUrl +'param?400y400'">
      <div class="info-wrap">
        <div>
          <button class="cir-btn-orange font-14">
            <svg-icon name="crown-gold"></svg-icon>
            精品歌单
          </button>
        </div>
        <div class="banner-title">
          <div class="font-16">{{ highInfo.name }}</div>
          <div class="copy-writer font-12">{{ highInfo.copywriter }}</div>
        </div>
      </div>
    </div>
    <!--    歌单标签-->
    <div class="list-tag mtop-10 clearfix">
      <div class="tag-list-left">
        <button class="cir-btn-white pointer" @click="triggerCatList" @blur="showAllCats=false">
          {{ currentTag }}
          <i class="el-icon-arrow-right"></i>
          <CatList class="tag-pop-list"
                   title="全部歌单"
                   :catList="allCats"
                   v-show="showAllCats"
                   :clickTitle="closeCatList"
                   :clickTag="changeCat"></CatList>
        </button>
      </div>

      <!--      热门标签-->
      <div class="tag-list-right">
        <button v-for="(item,index) in hotCats" :key="index" class="no-btn pointer" @click="changeCat(item.name)">
          {{ item.name }}
        </button>
      </div>
    </div>

    <!--    歌单列表-->
    <ImgList type="playlist"
             :list="playList"
             class="mtop-10"
             @clickImg="toPlaylistDetail">
      <template v-slot="{item}">
        <div class="text-hidden"></div>
        {{ item.name }}
      </template>
    </ImgList>
    <!--    分页-->
    <div class="pagination" v-show="playList.length > 0">
      <el-pagination
          background
          :small="true"
          :page-size="50"
          layout="prev, pager, next"
          :total="pageInfo.total"
          @current-change="onPageChange"
          @prev-click="onPageChange(pageInfo.currentPage -1)"
          @next-click="onPageChange(pageInfo.currentPage -1)">
      </el-pagination>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.container {
  .banner {
    background-color: rgba(0, 0, 0, 0);
    height: 200px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;

    .img-back {
      position: absolute;
      top: -400px;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      filter: blur(45px);
    }

    .img-front {
      z-index: 2;
      margin: 0 20px;
      border-radius: 6px;
    }

    .info-wrap {
      z-index: 2;
      color: white;

      .banner-title {
        margin-top: 15px;

        .copy-writer {
          color: #c7c3c3;
          margin-top: 5px;
        }
      }
    }
  }

  .list-tag {
    width: 100%;

    .tag-list-left {
      float: left;
      position: relative;

      .circle-btn {
        color: black;
        //border: 1px solid #cbcbcb;
        border: 1px solid @greyD8;

        &:hover {
          background-color: @greyF2;
        }
      }

      .tag-pop-list {
        position: absolute;
        top: 40px;
        left: -1px;
        z-index: 10;
      }
    }

    .tag-list-right {
      float: right;
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
  }
}

.el-popover .el-popper {
  padding: 0;
}
</style>