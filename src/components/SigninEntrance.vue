<template>
  <div class="signin-entrance">
    <div v-show="!alreadyLogin" class="entrance">
      <!-- 登录 -->
      <div class="login">
        <router-link to="/login">
          <van-button class="login-btn">登录</van-button>
        </router-link>
      </div>

      <!-- 注册 -->
      <div class="register">
        <router-link to="/register">
          <van-button class="register-btn">注册</van-button>
        </router-link>
      </div>
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

.entrance {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  .login,
  .register {
    height: 36px;
  }
  a {
    margin-top: 10px;
    .login-btn,
    .register-btn {
      padding: 0;
      font-size: 1.2rem;
      height: 28px;
      color: @main-color;
    }
  }
}
</style>
