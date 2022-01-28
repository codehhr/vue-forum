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
      url: "https://codehhr.github.io/web/droplet/",
    };
  },
  methods: {
    goToIndex() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style lang="less">
#app {
  height: 100vh;
}
.entrance-animation {
  position: relative;
  height: 100%;
  overflow: hidden;
  .go-to-home {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    color: #aaaaaa;
    background-color: #525763;
    opacity: 0.68;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
canvas {
  height: 100%;
}
</style>
