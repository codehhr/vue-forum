<template>
  <div class="site">
    <go-back></go-back>
    <h1>源码:</h1>
    <div class="links">
      <a href="https://gitee.com/codehhr/vue-forum">
        <img
          class="gitee"
          src="https://gitee.com/static/images/logo-black.svg"
        />
      </a>
      <a href="https://github.com/codehhr/vue-forum">
        <img
          class="github"
          src="https://img0.baidu.com/it/u=2261056768,2828221545&fm=26.jpg"
        />
      </a>
    </div>
  </div>
</template>

<script>
import GoBack from "./GoBack.vue";
export default {
  name: "Site",
  methods: {},
  components: {
    GoBack,
  },
};
</script>

<style lang="less">
@icon-font-size: 2rem;

.site {
  h1 {
    margin: 0;
    padding: 20px;
    width: 100%;
    text-align: left;
  }
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  a {
    margin: 10px 0;
    padding-left: 20px;
    width: 100%;
    text-align: left;
    display: block;
  }
  .gitee,
  .github {
    height: 40px;
  }
  .gitee {
    margin-left: 10px;
    height: 32px;
  }
}
</style>
