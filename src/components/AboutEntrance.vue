<template>
  <div v-show="alreadyLogin" class="about-me-entrance">
    <a-icon class="bell-icon" type="sound" />
    <van-button class="about-me-btn">关于我的</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AboutEntrance",
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
    }),
  },
};
</script>

<style scoped lang="less">
.about-me-entrance {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .bell-icon {
    width: 24px;
    font-size: 1rem;
  }
  .about-me-btn {
    margin: 0 10px;
  }
}
</style>
