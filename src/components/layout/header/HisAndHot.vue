<script setup>
import {ref, defineEmits, defineProps, onMounted} from 'vue'
import {Delete, Close} from '@element-plus/icons-vue'
import {getHotSearch} from "@/api/api_other.js";
import {useRouter} from "vue-router";

defineProps({
  searchHis: {
    type: Array
  }
})
const emit = defineEmits(['clearHistory'])
const clearHis = () => {
  emit('deleteHis')
}

const deleteHis = (val) => {
  emit('deleteHis', val)
}

const hotList = ref([])
onMounted(async () => {
  const res = await getHotSearch()
  if (res.code !== 200) return
  hotList.value = res.data
})

const router = useRouter()
const clickHot = (keywords) => {
  router.push({
    name:'SearchPage',
    query:{keywords}
  })
}
</script>

<template>
  <div class="his-and-hot">
    <!--              搜索历史-->
    <div class="search-his">
      <div class="his-title clearfix">
        <div class="font-16">搜索历史</div>
        <button class="no-btn" @click="clearHis" v-show="searchHis.length">
          <Delete style="width: 1em; height: 1em"/>
        </button>
      </div>
      <div class="his-wrap">
        <button class="btn btn-white his-item font-12" v-for="val in searchHis" :key="val" @click="clickHot(val)">
          {{ val }}
          <Close class="his-item-btn" @click="deleteHis(val)"/>
        </button>
      </div>
    </div>
    <!--              热搜榜-->
    <div class="search-hot">
      <div class="hot-title font-16">热搜榜</div>
      <div class="hot-item pointer"
           :class="{'top-item':(index < 3)}"
           v-for="(item,index) in hotList"
           :key="item.searchWord"
           @click="clickHot(item.searchWord)">
        <div class="item-index">{{ index + 1 }}</div>
        <div class="item-info">
          <div class="key-word">
            <span class="font-12 item-key">{{ item.searchWord }}</span>
            <span style="color: #c2c1c1" class="font-12 mleft-10">{{ item.score }}</span>
          </div>
          <div>
            <span style="color: #999999" class="font-12">{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine";

.his-and-hot {
  .search-his {
    height: 100%;

    .his-title {
      width: 100%;
      color: #666666;

      div {
        float: left;
        line-height: 24px;
        height: 24px;
      }

      button {
        margin-top: 4px;
        float: left;
      }
    }

    .his-wrap {
      margin-top: 5px;
      display: flex;
      // 一行放不下则自动换行
      flex-wrap: wrap;
      align-items: center;

      .his-item {
        margin: 0 10px 10px 0;
        height: 26px;
        line-height: 16px;
        vertical-align: center;
        display: flex;
        align-items: center;
        padding-right: 5px;

        &:hover {
          .his-item-btn {
            color: #8c8c8c;
          }
        }

        .his-item-btn {
          width: 1em;
          height: 1em;
          color: #fff;
        }
      }
    }
  }

  .search-hot {

    .hot-title {
      color: #666666;
      height: 40px;
    }

    .hot-item {
      height: 50px;
      display: flex;
      align-items: center;

      &:hover {
        background-color: #f2f2f2;
      }

      .item-index {
        color: #c2c2c2;
        width: 40px;
        text-align: center;
      }
    }

    .top-item {
      .item-index {
        color: #e13e3e;
      }

      .item-key {
        font-weight: bold;
      }
    }
  }
}
</style>