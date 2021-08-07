<template>
  <div class="entrance-animation">
    <router-link :to="{ name: 'index' }">
      <a-button class="go-to-home">跳过</a-button>
    </router-link>
    <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "Animation",
  data() {
    return {
      url:
        // "https://www.51qianduan.com/uploadfile/article/1905/12/8418/index.html",
        "https://codehhr.github.io/web/coderain/",
    };
  },
};
</script>

<style scoped lang="less">
.entrance-animation {
  position: relative;
  .go-to-home {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
  }
  iframe {
    width: 100vw;
    height: 100vh;
  }
}
</style>
