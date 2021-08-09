<template>
  <div class="header-nav">
    <van-cell class="nav-btn" @click="showNavPopup">
      <van-icon name="wap-nav" />
    </van-cell>
    <!-- 左侧弹出框 start -->
    <van-popup class="nav-popup" position="left" v-model="navShow">
      <!-- 搜索组件 -->
      <search @closePopUpAfterSearch="closePopup"></search>

      <!-- 关于本站 -->
      <div>
        <router-link :to="{ name: 'site' }">
          <a-icon class="bell-icon" type="sound" />
          <span>关于本站</span>
        </router-link>
      </div>

      <!-- 其他 -->
      <div class="extra">
        <router-link to="/extra">
          <a-icon type="compass" />
          <span>其他</span>
        </router-link>
      </div>

      <!-- 登录注册入口组件 -->
      <signin-entrance></signin-entrance>

      <!-- 我参与的 -->
      <about-entrance></about-entrance>

      <!-- 个人中心入口组件 -->
      <user-entrance @requestClosePopup="closePopup"></user-entrance>
    </van-popup>
    <!-- 左侧弹出框 end -->
  </div>
</template>

<script>
import Search from "./Search";
import UserEntrance from "./UserEntrance";
import AboutEntrance from "./AboutEntrance";
import SigninEntrance from "./SigninEntrance";

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
    UserEntrance,
    AboutEntrance,
    SigninEntrance,
  },
};
</script>

<style scoped lang="less">
@font-size: 1rem;

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
      width: 100%;
      height: 46px;
      i {
        width: 24px;
        height: 24px;
        font-size: @font-size;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 20px;
        &:active {
          background-color: #e8ecf3;
        }
        padding: 0 10px;
        height: 100%;
        width: 100% !important;
        text-align: left;
        span {
          margin: 0 10px;
          font-size: @font-size;
          line-height: 46px;
        }
      }
    }
  }
}
</style>
