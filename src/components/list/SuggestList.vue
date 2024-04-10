<script setup>

</script>

<template>
  <div class="suggest-list">
    <header class="suggest-list-header">
      <slot name="title"></slot>
    </header>
    <main class="suggest-item-main">
      <slot name="item"></slot>
    </main>
  </div>
</template>

<style scoped lang="less">
.suggest-list-header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  background-color: #f5f5f7;
}

.item {
  box-sizing: border-box;
  padding: 0 20px;
  line-height: 28px;
  height: 28px;
  font-size: 12px;

  &:hover {
    background-color: #f2f2f2;
  }
}
</style>