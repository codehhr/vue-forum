<template>
  <div class="site">
    <!-- github -->
    <a href="https://github.com/codehhr/vue-forum">
      <a-icon class="github-icon" type="github" theme="filled" />
    </a>
    <!-- gitee -->
    <a href="https://gitee.com/codehhr/vue-forum">
      <a-icon type="gitee" theme="filled" />
    </a>
  </div>
</template>

<script>
export default {
  name: "Site",
};
</script>

<style lang="less">
@icon-font-size: 2rem;

.site {
  padding: 20px;
  .github-icon {
    font-size: @icon-font-size;
    color: #000000 !important;
  }
}
</style>
