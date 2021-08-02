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
  color: #42b983;
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
  .van-button {
    border: none;
    outline: none;
  }
}
</style>
