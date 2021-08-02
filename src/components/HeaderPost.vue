<template>
  <div class="header-post">
    <van-cell class="edit-btn" @click="showEditPopup">
      <van-icon name="edit" />
    </van-cell>
    <van-popup
      class="edit-popup"
      closeable
      close-icon-position="top-left"
      position="top"
      v-model="editShow"
      >内容</van-popup
    >
  </div>
</template>

<script>
export default {
  name: "HeaderPost",
  data() {
    return {
      editShow: false,
    };
  },

  methods: {
    showEditPopup() {
      this.editShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.header-post {
  .edit-btn {
    padding: 0;
    font-size: 1.6rem;
  }
  .edit-popup {
    height: 40%;
  }
}
</style>
