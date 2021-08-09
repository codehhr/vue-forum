<template>
  <div class="entrance-animation">
    <a-button @click="goToIndex" class="go-to-home">跳过</a-button>
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
        "https://codehhr-web.netlify.app/coderain/",
    };
  },
  methods: {
    goToIndex() {
      this.$router.push({ name: "index" });
    },
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
