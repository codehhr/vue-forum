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
        <!-- <router-link to="/post">
          
        </router-link> -->
        <a-dropdown class="edit" :trigger="['click']">
          <a-menu class="edit-menu" slot="overlay" @click="handleMenuClick">
            <a-menu-item class="edit-menu-item" key="1"
              ><a-icon type="edit" />文本</a-menu-item
            >
            <a-menu-item class="edit-menu-item" key="2">
              <span v-text="'</>副文本'"></span>
            </a-menu-item>
          </a-menu>
          <a-button style="width: 24px;height: 100%;border: none;">
            <a-icon class="edit" type="form" />
          </a-button>
        </a-dropdown>
        <!-- editor -->
        <van-popup class="text-popup" position="right" v-model="editorShow">
          <go-back @close="showEditor">
            <template v-slot:publish>
              <van-icon
                @click="confirmPublish"
                class="publish-icon"
                name="share"
              />
              <van-dialog
                v-model="showDialog"
                title="确定发表吗"
                show-cancel-button
                class="dialog"
              >
                <img width="100%" src="https://img01.yzcdn.cn/vant/doge.png" />
              </van-dialog>
            </template>
          </go-back>
          <post-text v-show="key == 1"></post-text>
          <post-html v-show="key == 2"></post-html>
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
import { mapState } from "vuex";
import PostText from "../components/PostText";
import PostHtml from "../components/PostHtml";
import GoBack from "../components/GoBack";

export default {
  name: "Index",
  data() {
    return {
      // 显示编辑器
      editorShow: false,
      // 编辑选项
      key: null,
      showDialog: false,
    };
  },
  methods: {
    // 点击编辑选项
    handleMenuClick(values) {
      if (values.key == 1) {
        this.editorShow = true;
        this.key = 1;
      } else {
        this.editorShow = true;
        this.key = 2;
      }
    },
    // 关闭 editor
    showEditor(data) {
      this.editorShow = data;
    },
    // 确认发表
    confirmPublish() {
      this.showDialog = true;
    },
  },
  mounted() {
    this.container = this.$refs.container;
  },
  created() {
    if (this.hasNotificate) {
      return;
    } else {
      this.$notification.open({
        message: "提示",
        description: "欢迎来到 亿个人的论坛",
        style: {
          width: "300px",
          marginLeft: `calc(${100}% - 300px)`,
        },
      });
      this.$store.commit("setNotificate", true);
    }
  },
  computed: {
    ...mapState({
      hasNotificate: "hasNotificate",
    }),
  },
  components: {
    PageHeader,
    HeaderNav,
    SwitchTopics,
    PostList,
    PostText,
    PostHtml,
    GoBack,
  },
};
</script>

<style scoped lang="less">
.edit-menu {
  border-radius: 10px;
  .edit-menu-item {
    padding: 10px 40px;
  }
}
.text-popup,
.html-popup {
  height: 100%;
  .dialog {
    margin: 0;
    padding: 20px;
  }
}
</style>
<style lang="less">
.van-dialog__header {
  padding: 0;
}
</style>
