<template>
  <div v-show="alreadyLogin" @click="goToAbout" class="about-me-entrance">
    <a-icon class="bell-icon" type="sound" />
    <span>关于我的</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AboutEntrance",
  methods: {
    goToAbout() {
      this.$router.push({ name: "about" });
    },
  },
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
    }),
  },
};
</script>

<style scoped lang="less">
@main-color: #4d698e;

.about-me-entrance {
  padding: 0 10px;
  border-radius: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  &:active {
    background-color: #e8ecf3;
  }
  .bell-icon {
    width: 24px;
    font-size: 1rem;
  }
  span {
    margin: 0 10px;
    font-size: 1rem;
    color: @main-color;
  }
}
</style>
