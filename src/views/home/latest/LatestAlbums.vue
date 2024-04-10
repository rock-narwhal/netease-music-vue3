<script setup>
import {ref, onMounted} from 'vue'
import {getLatestAlbum} from "@/api/api_toplist.js";

const menus = ref([
  {name: '全部', type: 'ALL', active: true}, {name: '华语', type: 'ZH', active: false},
  {name: '欧美', type: 'EA', active: false}, {name: '日本', type: 'JP', active: false},
  {name: '韩国', type: 'KR', active: false}
])

const queryParam = ref({
  area: 'ALL',
  type: 'hot', // new:全部 hot:热门
})

const albumList = ref([])
const getAlbum = async () => {
  const res = await getLatestAlbum(queryParam.value)
  if (res.code !== 200) return
  albumList.value = res.monthData
}
onMounted(() => {
  getAlbum()
})

const getAlbumByType = (type) => {
  if (queryParam.value.type === type && albumList.value.length > 0) return
  queryParam.value.type = type
  getAlbum()
}

const getAlbumByArea = (area) => {
  if (queryParam.value.area === area && albumList.value.length > 0) return
  queryParam.value.area = area
  getAlbum()
}

</script>

<template>
  <div>
    <div class="menu-bar">
      <SelectorMenu :option="menus" @clickTab="getAlbumByArea">
        <template v-slot:rightBtn>
          <button @click="getAlbumByType('hot')" class="no-btn" :class="{active: queryParam.type === 'hot'}">推荐
          </button>
          <button @click="getAlbumByType('new')" class="no-btn" :class="{active: queryParam.type === 'new'}">全部
          </button>
        </template>
      </SelectorMenu>
    </div>
    <ImgList :list="albumList" type="album">
      <template v-slot="{item}">
        {{ item.name }}
      </template>
    </ImgList>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.menu-bar {
  margin-top: 40px;
  margin-bottom: 20px;

  button.active {
    color: @headRed;
  }
}
</style>