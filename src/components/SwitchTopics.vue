<template>
  <div class="switch-topics">
    <van-cell class="switch-topics-btn" @click="showSwitchTopicsPopup">
      <van-icon name="edit" />
    </van-cell>
    <van-popup
      class="switch-topics-popup"
      position="bottom"
      v-model="switchTopicsShow"
      >内容</van-popup
    >
  </div>
</template>

<script>
export default {
  name: "SwitchTopics",
  data() {
    return {
      switchTopicsShow: false,
    };
  },

  methods: {
    showSwitchTopicsPopup() {
      this.switchTopicsShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.switch-topics {
  .switch-topics-btn {
    padding: 0;
    font-size: 1.6rem;
  }
  .switch-topics-popup {
    height: 60%;
  }
}
</style>
