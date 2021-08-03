<template>
  <div class="go-home">
    <router-link to="/">
      <van-button class="go-home-btn" icon="wap-home-o" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GoHome",
};
</script>

<style lang="less" scoped>
.go-home {
  padding: 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 46px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  .go-home-btn {
    padding: 0;
  }
}
</style>
