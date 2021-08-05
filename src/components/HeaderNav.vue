<template>
  <div class="header-nav">
    <van-cell class="nav-btn" @click="showNavPopup">
      <van-icon name="wap-nav" />
    </van-cell>
    <!-- 左侧弹出框 start -->
    <van-popup class="nav-popup" position="left" v-model="navShow">
      <!-- 搜索组件 -->
      <search></search>

      <!-- 登录注册入口组件 -->
      <signin-entrance></signin-entrance>

      <!-- 关于我的 -->
      <about-entrance></about-entrance>

      <!-- 个人中心入口组件 -->
      <user-entrance @requestClosePopup="closePopup"></user-entrance>
    </van-popup>
    <!-- 左侧弹出框 end -->
  </div>
</template>

<script>
import Search from "../components/Search";
import SigninEntrance from "../components/SigninEntrance";
import UserEntrance from "../components/UserEntrance";
import AboutEntrance from "../components/AboutEntrance";

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
    closePopup(data) {
      this.navShow = data;
    },
  },
  components: {
    Search,
    SigninEntrance,
    UserEntrance,
    AboutEntrance,
  },
};
</script>

<style scoped lang="less">
.header-nav {
  user-select: none;
  .nav-btn {
    padding: 0;
    font-size: 1.6rem;
    height: 100%;
  }
  .nav-popup {
    padding: 20px 10px;
    width: 80%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    > div {
      height: 46px;
    }
  }
}
</style>
