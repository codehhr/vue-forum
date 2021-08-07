<template>
  <div v-show="!alreadyLogin" class="signin-entrance">
    <!-- 登录 -->
    <div class="login">
      <router-link :to="{ name: 'login' }">
        <van-button class="login-btn">登录</van-button>
      </router-link>
    </div>

    <!-- 注册 -->
    <div class="register">
      <router-link :to="{ name: 'register' }">
        <van-button class="register-btn">注册</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SigninEntrance",
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
    }),
  },
};
</script>

<style scoped lang="less">
@main-color: #4d698e;
@main-bg-color: #e8ecf3;

.signin-entrance {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  .login,
  .register {
    margin: 1px 0;
    padding: 0 10px;
    width: 100%;
    height: 36px;
    &:active {
      background-color: @main-bg-color;
    }
  }
  a {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .login-btn,
    .register-btn {
      padding: 0;
      font-size: 1.2rem;
      height: 36px;
      color: @main-color;
      background-color: transparent;
    }
  }
}
</style>
