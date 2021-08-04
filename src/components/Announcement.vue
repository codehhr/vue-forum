<template>
  <!-- 公告 -->
  <div class="announcement">
    <slot name="category"></slot>
    <slot name="title"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Announcement",
  data() {
    return {
      topicsList: [],
      color: "#87d068",
    };
  },
  created() {},
  computed: {
    ...mapState({
      categoryId: "categoryId",
      categoryName: "categoryName",
    }),
  },
};
</script>

<style scoped lang="less">
@catrgory-tag-span-font-size: 1rem;

.announcement {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .catrgory-tag {
    span {
      padding: 4px 8px;
      font-size: @catrgory-tag-span-font-size;
      border-radius: 6px;
    }
  }
}
</style>
<style lang="less"></style>
