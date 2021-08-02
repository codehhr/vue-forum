<template>
  <div>
    <!-- 左侧导航 -->
    <header-nav></header-nav>
    <!-- 切换论题 -->
    <switch-topics></switch-topics>
    <!-- 发表新帖 -->
    <header-post></header-post>
  </div>
</template>

<script>
import HeaderNav from "./HeaderNav";
import HeaderPost from "./HeaderPost";
import SwitchTopics from "./SwitchTopics";

export default {
  name: "PageHeader",
  components: {
    HeaderNav,
    HeaderPost,
    SwitchTopics,
  },
};
</script>

<style scoped></style>
