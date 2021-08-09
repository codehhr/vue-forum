<template>
  <div class="extra">
    <go-back></go-back>
    <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import GoBack from "./GoBack.vue";
export default {
  name: "Extra",
  data() {
    return {
      url: "https://codehhr-web.netlify.app/extra/",
    };
  },
  components: {
    GoBack,
  },
};
</script>

<style lang="less"></style>
