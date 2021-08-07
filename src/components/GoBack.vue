<template>
  <div class="go-back">
    <van-button @click="goBack" class="go-back-btn" icon="arrow-left" />
    <van-button @click="goHome" class="go-home-btn" icon="wap-home-o" />
  </div>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    goHome() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style scoped lang="less">
.go-back {
  padding: 0 20px 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  .go-back-btn {
    padding: 0;
    width: 40px;
  }
}
</style>
