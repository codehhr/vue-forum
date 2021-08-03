<template>
  <div class="switch-topics">
    <!-- 分类按钮 -->
    <van-cell class="switch-topics-btn" @click="showSwitchTopicsPopup">
      <span>全部主题</span>
    </van-cell>
    <!-- 弹出框 -->

    <van-popup
      class="switch-topics-popup"
      position="bottom"
      v-model="switchTopicsShow"
    >
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getTopicsList } from "../api/api";

export default {
  name: "SwitchTopics",
  data() {
    return {
      switchTopicsShow: false,
      categories: [],
    };
  },
  methods: {
    // 显示专题列表选择框
    showSwitchTopicsPopup() {
      this.switchTopicsShow = true;
    },
    // 获取专题列表
    getTopicList() {
      getTopicsList().then((res) => {
        let nameList = [];
        res.rows.forEach((item) => {
          nameList.push(item.name);
        });
        this.categories = nameList;
      });
    },
    // 点击确认
    onConfirm(value) {
      Toast(value);
      this.$store.commit("setCategory", value);
      this.switchTopicsShow = false;
    },
    // change
    onChange() {},
    // 点击取消
    onCancel() {
      this.switchTopicsShow = false;
    },
  },

  created() {
    this.getTopicList();
  },
};
</script>

<style scoped lang="less">
@main-color: #4d698e;

.switch-topics {
  .switch-topics-btn {
    padding: 0;
    span {
      font-size: 1.1rem;
      color: @main-color;
    }
  }
}
</style>
