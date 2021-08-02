<template>
  <div class="page-header">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>

<style scoped lang="less">
.page-header {
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
</style>
