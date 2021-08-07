<template>
  <div class="about-me">
    <go-back></go-back>
    <van-pull-refresh
      class="pull-refresh-block"
      v-model="isPullLoading"
      :head-height="80"
      @refresh="onRefresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="'transform: scale(' + props.distance / 80 + ')'"
        />
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
      </template>
      <a-list
        class="log-list"
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="logList"
      >
        <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
        <!-- <router-link to="/"> -->
        <a-list-item
          class="log-item"
          slot="renderItem"
          key="item.postsId"
          slot-scope="item"
        >
          <van-swipe-cell>
            <div class="header">
              <!-- 头像 -->
              <a-avatar class="log-item-avatar" :src="item.avatar" />
              <!-- 用户名 -->
              <span class="username">{{ item.userName }}</span>
            </div>
            <!-- 标题 -->
            <div class="title" v-html="item.title"></div>
            <div class="body">
              <!-- 封面 -->
              <div
                class="cover"
                :style="
                  'background: url(' +
                    item.coverImgUrl +
                    ') center center no-repeat'
                "
              ></div>
              <!-- 描述 -->
              <div class="intro">
                <span v-html="item.intro"></span>
              </div>
            </div>
            <div class="footer">
              <!-- 赞 -->
              <template v-for="{ type } in actions">
                <span class="actions" :key="type">
                  <a-icon :type="type" style="margin-right: 8px" />
                  <span>{{ item.zan }} 人觉得很赞 </span>
                </span>
              </template>
            </div>
            <!-- 往左划显示编辑和删除 -->
            <template #right>
              <div v-show="userInfo.userId == item.userId">
                <van-button
                  square
                  text="编辑"
                  type="info"
                  @click="editPost(item.postsId)"
                  class="edit-button"
                />
                <van-button
                  square
                  text="删除"
                  type="danger"
                  class="delete-button"
                  @click="confirmDelete(item.postsId)"
                />
              </div>
            </template>
          </van-swipe-cell>
        </a-list-item>
        <!-- </router-link> -->
      </a-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { aboutMe, removePost } from "../api/api";
import { Dialog } from "vant";
import { mapState } from "vuex";
import GoBack from "./GoBack";

export default {
  name: "AboutMe",
  data() {
    return {
      // 下拉刷新状态
      isPullLoading: false,
      // 操作记录列表
      logList: [],
      pagination: {
        onChange: () => {},
        pageSize: 3,
      },
      actions: [{ type: "like-o" }],
    };
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.getAboutMeInfo();
      setTimeout(() => {
        this.$message.success(" 刷新成功 ~");
        this.isPullLoading = false;
      }, 500);
    },
    // 关于我的
    getAboutMeInfo() {
      aboutMe().then((res) => {
        if (res.code === 0) {
          this.logList = res.rows.reverse();
        } else {
          this.$message(res.msg);
        }
      });
    },
    // 确认删除
    confirmDelete(postsId) {
      Dialog.confirm({
        title: "提示",
        message: "删除此贴 ?",
      })
        .then(() => {
          this.deletePost(postsId);
        })
        .catch(() => {
          return;
        });
    },
    // 删除帖子
    deletePost(postsId) {
      removePost(postsId).then((res) => {
        if (res.code === 0) {
          this.$message.success("已删除 !");
          this.getAboutMeInfo();
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 修改帖子
    editPost(postsId) {
      this.$router.push({ name: "editpost", params: { postsId } });
    },
  },
  created() {
    this.getAboutMeInfo();
  },
  computed: {
    ...mapState({
      userInfo: "userInfo",
    }),
  },
  components: {
    GoBack,
  },
};
</script>

<style scoped lang="less">
.pull-refresh-block {
  height: calc(100vh - 46px);
  .log-list {
    padding-left: 20px;
  }
}
</style>
<style lang="less">
@username-font-size: 0.8rem;
@username-color: #666666;
@intro-color: #666666;
@intro-font-size: 0.8rem;

.log-item {
  height: 200px;
  .header {
    height: 32px;
    text-align: left;
    .username {
      margin-left: 10px;
    }
  }
  .title {
    padding-right: 20px;
    width: 100%;
    text-align: center;
  }
  .body {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .cover {
      border-radius: 5px;
      width: 100px;
      height: 100% !important;
      background-size: cover !important;
    }
    .intro {
      padding: 0 20px;
      width: calc(100% - 140px);
      height: 80%;
      font-size: @intro-font-size;
      overflow: auto;
    }
  }
  .footer {
    padding: 0 20px;
    text-align: right;
  }
  .van-swipe-cell__right {
    width: 200px;
    height: 100%;
    > div {
      height: 100%;
      .van-button {
        width: 50%;
        height: 100%;
        font-size: 1.8rem;
      }
    }
  }
}
.ant-pagination {
  text-align: center;
}
.ant-pagination-item {
  a {
    line-height: 32px;
  }
}
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
