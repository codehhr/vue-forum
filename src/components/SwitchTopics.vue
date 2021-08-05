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
      <div @click="switchCategory('')" class="category-item">
        <div class="category-cover-outer">
          <div class="all category-cover"></div>
        </div>
        <div class="category-name">全部分类</div>
        <!-- 弹性布局占位 -->
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
        <!-- 弹性布局占位 -->
        <div></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
        let tempCategoryList = [];
        res.rows.forEach((item) => {
          tempCategoryList.push(item);
        });
        this.categoryList = tempCategoryList;
      });
    },
    // 获取点击分类 Id
    switchCategory(categoryId) {
      // 设置 categoryId
      // this.pageNum = 1;
      this.$store.commit("setCategoryId", categoryId);
      localStorage.setItem("categoryId", JSON.stringify(categoryId));
      getPostList({
        categoryId: this.categoryId,
        pageNum: 1,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.code === 0) {
          if (res.rows.length === 0) {
            this.$message.warning("那个分类目前还没有什么东西~");
          } else {
            // 初始化触底是否需要再加载状态 (小于一页的情况)
            if (this.pageSize >= res.total) {
              this.$store.commit("setLoadEnd", true);
            } else {
              this.$store.commit("setLoadEnd", false);
            }
            this.$store.commit("setPostList", res.rows);
            this.$store.commit("clearPreviewImgList", []);
            this.$store.commit("setPreviewImgList", res.rows);
          }
        } else {
          this.$message.warning(res.msg);
        }
      });
      this.switchTopicsShow = false;
    },
  },

  created() {
    // 获取专题列表
    this.getTopicList();
  },
  computed: {
    ...mapState({
      categoryId: "categoryId",
      pageSize: "pageSize",
    }),
    pageNum: {
      get() {
        return this.$store.state.pageNum;
      },
      set(payload) {
        this.$store.commit("setPageNum", payload);
      },
    },
  },
};
</script>

<style scoped lang="less">
@main-color: #4d698e;
@category-name-font-size: 1.2rem;

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
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:active {
        background-color: #d8d9db;
      }
      .category-cover-outer {
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        .category-cover {
          width: 50px;
          height: 100%;
          background-size: cover !important;
          background-color: #aab9ce;
        }
      }
      .all {
        width: 100%;
        height: 100%;
        background: url("../assets/tom.png") center center no-repeat;
      }
      .category-name {
        font-size: @category-name-font-size;
      }
    }
  }
}
</style>
