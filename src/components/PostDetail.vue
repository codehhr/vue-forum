<template>
  <div class="post-detail">
    <go-home></go-home>
    <div class="post-detail-header"></div>
    <div class="post-detail-body"></div>
    <div class="post-detail-comments"></div>
  </div>
</template>

<script>
import GoHome from "../components/GoHome";
export default {
  name: "PostDetail",
  methods: {
    renderData() {
      console.log(this.$route.params.postsId);
    },
  },
  components: {
    GoHome,
  },
  created() {
    this.renderData();
  },
};
</script>

<style scoped lang="less"></style>
