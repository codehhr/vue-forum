<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    // 检查登录状态
    this.$store.dispatch("checkAlreadyLogin");
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

a {
  display: inline-block;
  text-decoration: none;
  color: #4d698e;
}

ul {
  list-style: none !important;
}

img {
  display: block;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  i {
    color: #4d698e;
  }
  .van-icon {
    font-size: 1.6rem;
  }
  .van-button {
    color: #4d698e;
    border: none;
    outline: none;
  }
  .login-form.ant-form {
    input {
      padding: 0 40px;
    }
  }
  .van-cell {
    padding: 0;
  }
  .van-button--normal {
    padding: 0;
  }
}
</style>
