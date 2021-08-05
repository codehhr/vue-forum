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
        <a-button @click="showEditorPopup" class="edit-btn" icon="edit" />
        <!-- editor -->
        <van-popup class="editor-popup" position="right" v-model="editorShow">
          <!-- 返回 -->
          <go-back @close="closeEditor"></go-back>
          <!-- post -->
          <post
            @closeEditorAfterPost="closeEditorAfterPost"
            class="post"
          ></post>
        </van-popup>
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
// import { mapState } from "vuex";
import GoBack from "../components/GoBack";
import Post from "../components/Post";

export default {
  name: "Index",
  data() {
    return {
      // 显示编辑器
      editorShow: false,
    };
  },
  methods: {
    // 显示发表页
    showEditorPopup() {
      this.editorShow = true;
    },
    closeEditor(data) {
      this.editorShow = data;
    },
    // 确认发表
    confirmPublish() {
      this.showDialog = true;
    },
    // 发表后回关闭编辑页
    closeEditorAfterPost(data) {
      this.editorShow = data;
    },
  },
  mounted() {
    this.container = this.$refs.container;
  },
  created() {},
  computed: {},
  components: {
    PageHeader,
    HeaderNav,
    SwitchTopics,
    PostList,
    Post,
    GoBack,
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
