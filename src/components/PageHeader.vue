<template>
  <div>
    <!-- 导航 -->
    <header-nav></header-nav>
    <!-- 切换论题 -->
    <switch-topics></switch-topics>
    <!-- 发表新帖 -->
    <header-post></header-post>
  </div>
</template>

<script>
import HeaderNav from "./HeaderNav";
import SwitchTopics from "./SwitchTopics";
import HeaderPost from "./HeaderPost";

export default {
  name: "PageHeader",
  components: {
    HeaderNav,
    SwitchTopics,
    HeaderPost,
  },
};
</script>

<style scoped></style>
