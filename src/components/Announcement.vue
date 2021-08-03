<template>
  <!-- 公告 -->
  <div class="announcement">
    <slot name="category"></slot>
    <slot name="title"></slot>
  </div>
</template>

<script>
export default {
  name: "Announcement",
};
</script>

<style scoped lang="less">
@announcement-bg-color: #e8ecf3;

.announcement {
  height: 100px;
  background-color: @announcement-bg-color;
}
</style>
