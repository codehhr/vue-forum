<template>
  <div class="postdetail">
    <go-home></go-home>
    <!-- 公告 -->
    <announcement></announcement>
    <div class="post-detail">
      <div class="post-detail-header"></div>
      <div class="post-detail-body"></div>
      <div class="post-detail-comments"></div>
    </div>
  </div>
</template>

<script>
import GoHome from "../components/GoHome";
import Announcement from "../components/Announcement";

export default {
  name: "PostDetail",
  methods: {
    renderData() {
      console.log(this.$route.params.postsId);
    },
  },
  components: {
    GoHome,
    Announcement,
  },
  created() {
    this.renderData();
  },
};
</script>

<style scoped lang="less"></style>
