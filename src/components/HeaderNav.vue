<template>
  <div class="header-nav">
    <van-cell class="nav-btn" @click="showNavPopup">
      <van-icon name="wap-nav" />
    </van-cell>
    <van-popup class="nav-popup" position="left" v-model="navShow"
      >内容</van-popup
    >
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      navShow: false,
    };
  },
  methods: {
    showNavPopup() {
      this.navShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.header-nav {
  .nav-btn {
    padding: 0;
    font-size: 1.6rem;
    height: 100%;
  }
  .nav-popup {
    width: 50%;
    height: 100vh;
  }
}
</style>
