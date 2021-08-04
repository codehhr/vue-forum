<template>
  <div class="switch-topics">
    <!-- 分类按钮 -->
    <van-cell class="switch-topics-btn" @click="showSwitchTopicsPopup">
      <span>全部分类</span>
    </van-cell>
    <!-- 弹出框 -->

    <van-popup
      class="switch-topics-popup"
      position="bottom"
      v-model="switchTopicsShow"
    >
      <div @click="switchCategory()" class="category-item">
        <div class="category-cover-outer">
          <div class="all category-cover">All</div>
        </div>
        <div class="category-name">全部分类</div>
        <div></div>
      </div>
      <div
        class="category-item"
        v-for="(item, index) in categoryList"
        :key="index"
        @click="switchCategory(item.categoryId)"
      >
        <div class="category-cover-outer">
          <div
            class="category-cover"
            :style="
              'background: url(' + item.cover + ') center center no-repeat'
            "
          ></div>
        </div>
        <div class="category-name">{{ item.name }}</div>
        <div></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getTopicsList, getPostList } from "../api/api";

export default {
  name: "SwitchTopics",
  data() {
    return {
      // 预加载
      loading: true,
      // 显示切换分类选项
      switchTopicsShow: false,
      //
      categoryList: [],
    };
  },
  methods: {
    handleClick() {
      this.loading = !this.loading;
    },
    // 显示专题列表选择框
    showSwitchTopicsPopup() {
      this.switchTopicsShow = true;
    },
    // 获取专题列表
    getTopicList() {
      getTopicsList().then((res) => {
        let categoryList = [];
        res.rows.forEach((item) => {
          categoryList.push(item);
        });
        this.categoryList = categoryList;
      });
    },
    // 获取点击分类 Id
    switchCategory(categoryId) {
      getPostList(categoryId, 1, 10).then((res) => {
        if (res.code === 0) {
          if (res.rows.length === 0) {
            this.$message.warning("那个分类目前还没有什么东西~");
          } else {
            this.$store.commit("setPostList", res.rows);
          }
        } else {
          this.$message.warning(res.msg);
        }
      });
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
  .switch-topics-popup {
    height: 60%;
    padding: 10px 0;
    .category-item {
      margin: 10px 0;
      padding: 0 40px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:active {
        background-color: #d8d9db;
      }
      .category-cover-outer {
        height: 100%;
        border-radius: 16px;
        overflow: hidden;
        .category-cover {
          width: 60px;
          height: 100%;
          background-size: cover !important;
          background-color: #aab9ce !important;
        }
      }
      .all {
        width: auto;
        height: auto;
        padding: 10px;
        color: #ffffff;
        font-size: 2rem;
      }
      .category-name {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
