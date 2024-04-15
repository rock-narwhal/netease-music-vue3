<script setup>
import SvgIcon from "@/components/svg/SvgIcon.vue";

defineProps({
  user: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="user-card-wrapper clearfix">
    <img class="user-avatar" v-lazy="user.avatarUrl + '?param=200y200'">
    <div class="user-info">
      <div>{{ user.nickname }}
        <svg-icon :name="user.gender === 1 ? 'male' : 'female'"></svg-icon>
      </div>
      <div class="user-signature text-over font-12" v-if="user.signature">{{ user.signature }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "@/assets/less/lessDefine.less";

.user-card-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 1px solid @greyD8;
  }

  .user-info {
    width: 300px;
    height: 50px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .user-signature {
      margin-top: 10px;
    }
  }
}
</style>