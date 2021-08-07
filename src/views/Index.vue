<template>
  <div>
    <!-- 顶部 start -->
    <page-header>
      <!-- 左侧导航 -->
      <template v-slot:left>
        <header-nav></header-nav>
      </template>

      <!-- 切换论题 -->
      <template v-slot:center>
        <switch-topics></switch-topics>
      </template>

      <!-- 发表新帖 -->
      <template v-slot:right>
        <!-- editor-btn -->
        <router-link :to="{ name: 'post' }">
          <a-button @click="checkAlreadyLogin" class="edit-btn" icon="form" />
        </router-link>
        <!-- editor
        <van-popup class="editor-popup" position="right" v-model="editorShow">
          返回
          <go-back @close="closeEditor"></go-back>
          post
          <post
            @closeEditorAfterPost="closeEditorAfterPost"
            class="post"
          ></post>
        </van-popup> -->
      </template>
    </page-header>
    <!-- 顶部 end -->

    <!-- 帖子列表 start -->
    <post-list></post-list>
    <!-- 帖子列表 end -->
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import HeaderNav from "../components/HeaderNav";
import SwitchTopics from "../components/SwitchTopics";
import PostList from "../components/PostList";
import { mapState } from "vuex";

export default {
  name: "Index",
  methods: {
    // 确认登录
    checkAlreadyLogin() {
      if (this.alreadyLogin) {
        return;
      } else {
        this.$message.warning("请先登录 ~");
      }
    },
  },
  mounted() {
    this.container = this.$refs.container;
  },
  created() {},
  components: {
    PageHeader,
    HeaderNav,
    SwitchTopics,
    PostList,
  },
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
    }),
  },
};
</script>

<style scoped lang="less">
.edit-btn {
  border: none;
}
.editor-popup {
  width: 100%;
  height: 100%;
  .dialog {
    margin: 0;
    padding: 20px;
  }
  .post {
    padding-bottom: 10px;
    height: calc(100% - 46px);
    overflow: auto;
  }
}
</style>
<style lang="less">
.van-dialog__header {
  padding: 0;
}
</style>
