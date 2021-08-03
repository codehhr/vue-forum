<template>
  <div @click="goBack" class="go-back">
    <van-button class="go-back-btn" icon="arrow-left" />
  </div>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      this.$emit("close", false);
    },
  },
};
</script>

<style scoped lang="less">
.go-back {
  padding: 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 46px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  .go-back-btn {
    padding: 0;
  }
}
</style>
