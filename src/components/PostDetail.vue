<template>
  <div class="postdetail">
    <go-back></go-back>
    <div class="post-detail-outer">
      <div class="post-detail">
        <div class="post-detail-header">
          <!-- 标题 -->
          <announcement>
            <template v-slot:category>
              <div>
                <a-tag color="#f5f5f5">
                  <h2
                    :style="{ color: color }"
                    class="category-name"
                    v-text="renderPostDetailCategoryName()"
                  ></h2>
                </a-tag>
              </div>
            </template>
            <template v-slot:title>
              <div>
                <h2 class="post-title" v-html="postItem.title"></h2>
              </div>
            </template>
          </announcement>
        </div>
        <!-- detail -->
        <div class="post-detail-body">
          <!-- avatar -->
          <div
            class="avatar"
            :style="
              'background: url(' + postItem.avatar + ') center center no-repeat'
            "
          ></div>
          <!-- content -->
          <div class="post-detail-content">
            <van-skeleton title avatar :row="3" :loading="loading">
              <img class="cover" :src="postItem.coverImgUrl" alt="" />
              <div class="post-intro" v-html="postItem.intro"></div>
            </van-skeleton>
            <div class="post-detail-content-footer">
              <div class="create-time">
                <a-icon type="file-markdown" /><span
                  >发表于{{ postItem.sendTime }}</span
                >
              </div>
              <div v-show="postItem.updateTime" class="update-time">
                <a-icon type="history" /><span
                  >更新于{{ postItem.updateTime }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- comments start -->
        <div class="post-detail-comments">
          <div class="comment">
            <!-- 当前用户评论 start -->
            <a-comment>
              <a-avatar
                slot="avatar"
                :src="
                  userInfo
                    ? userInfo.avatar
                    : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
                "
                :alt="userInfo ? userInfo.userName : ''"
              />
              <div slot="content">
                <a-form-item>
                  <a-textarea
                    :rows="3"
                    :value="userCommentValue"
                    placeholder="来发评论吧 ~ (支持副文本)"
                    @change="handleChange"
                  />
                </a-form-item>
                <a-form-item>
                  <a-button
                    html-type="submit"
                    :loading="submitting"
                    type="primary"
                    @click="handleSubmit"
                  >
                    添加评论
                  </a-button>
                </a-form-item>
              </div>
            </a-comment>
            <!-- 当前用户评论 end -->

            <!-- 评论列表 start -->
            <a-list
              class="comment-list"
              :header="`共 ${commentsList.length} 条回复`"
              item-layout="horizontal"
              :data-source="commentsList"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <div class="reply-list">
                  <van-skeleton title avatar :row="3" :loading="loading">
                    <a-comment :author="item.userName" :avatar="item.avatar">
                      <p v-html="item.commentContent" slot="content"></p>
                      <a-tooltip slot="datetime" :title="item.updatedTime">
                        <span>{{ item.updatedTime }}</span>
                      </a-tooltip>
                      <template slot="actions">
                        <span key="comment-basic-like">
                          <a-tooltip title="Like">
                            <a-icon
                              type="like"
                              :theme="
                                `action${item.commentId}` === `liked`
                                  ? 'filled'
                                  : 'outlined'
                              "
                              @click="like(item.commentId)"
                            />
                          </a-tooltip>
                          <span
                            :ref="`like${item.commentId}`"
                            style="padding-left: '8px';cursor: 'auto'"
                          >
                            0
                          </span>
                        </span>
                        <a-divider type="vertical" />
                        <span key="comment-basic-reply-to">回复</span>
                      </template>
                    </a-comment>
                  </van-skeleton>
                </div>
              </a-list-item>
            </a-list>
            <!-- 评论列表 end -->
          </div>
        </div>
        <!-- comments end -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Announcement from "./Announcement";
import {
  getTopicsList,
  getPostDetail,
  getCommentsList,
  postComment,
} from "../api/api";
import GoBack from "./GoBack";
import moment from "moment";

export default {
  name: "PostDetail",
  data() {
    return {
      // 骨架屏
      loading: true,
      // 评论列表
      commentsList: [],
      submitting: false,
      // 当前用户要提交的评论内容
      userCommentValue: "",
      // 赞数量
      zan: 0,
      // 点赞动作
      action: null,
      moment,
      // 每一项
      postItem: {},
      // 分类数组
      postCategoryList: [],
    };
  },
  // props: {
  //   // 从 postList 传过来的 item 和 分类的数组
  //    {
  //     type: Object,
  //   },
  // },
  methods: {
    // 点赞
    like(commentId) {
      this[`action${commentId}`] = `liked`;
      this.$refs[`like${commentId}`].innerHTML = 1;
    },
    // 渲染数据
    getTopicsListBeforeRrender() {
      getTopicsList().then((res) => {
        if (res.code === 0) {
          this.postCategoryList = res.rows;
          this.renderPostDetailCategoryName();
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 渲染详情页标签名
    renderPostDetailCategoryName() {
      this.getPostItem(this.$route.params.postsId);
      // 分类标签名
      let tagName = "";
      this.postCategoryList.forEach((item) => {
        if (item.categoryId == this.postItem.categoryId) {
          tagName = item.name;
        }
      });
      return tagName;
    },
    // 同步 data 于输入框里的值
    handleChange(e) {
      this.userCommentValue = e.target.value;
    },
    // 提交评论 (非回复)
    handleSubmit() {
      if (!this.userCommentValue) {
        return;
      } else {
        this.submitting = true;
        setTimeout(() => {
          this.submitting = false;
          postComment({
            postsId: this.postItem.postsId,
            commentContent: this.userCommentValue,
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success("提交成功");
              this.renderCommentsList(this.postItem.postsId);
            }
          });
          this.userCommentValue = "";
        }, 500);
      }
    },

    // 渲染评论列表
    renderCommentsList(postsId) {
      getCommentsList({ postsId, pageNum: 1, pageSize: 10 }).then((res) => {
        this.commentsList = res.rows;
      });
    },
    getPostItem(postsId) {
      getPostDetail(postsId).then((res) => {
        if (res.code === 0) {
          this.postItem = res.data;
          // 渲染评论
          this.renderCommentsList(this.postItem.postsId);
        }
      });
    },
  },
  computed: {
    ...mapState({
      color: "color",
      userInfo: "userInfo",
    }),
  },
  created() {
    this.getTopicsListBeforeRrender();
  },
  mounted() {
    this.loading = false;
  },
  components: {
    Announcement,
    GoBack,
  },
};
</script>

<style scoped lang="less">
@title-color: #ffffff;
@header-bg-color: #7cb6e9;
@title-font-size: 1.4rem;
@category-name-font-size: 0.9rem;
@post-intro-font-size: 1.2rem;
@post-detail-content-footer-font-size: 0.6rem;
@post-detail-content-footer-color: #aaaaaa;

.ant-tag.ant-tag-has-color {
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 6px;
  .category-name {
    margin: 0;
    padding: 1px 6px;
    font-size: @category-name-font-size;
  }
}
.post-detail-outer {
  height: calc(100vh - 46px);
  overflow-y: auto;
  .post-detail {
    // 头部
    .post-detail-header {
      background-color: @header-bg-color;
      .post-title {
        margin: 10px auto 0;
        font-size: @title-font-size;
        color: @title-color;
      }
    }
    // 帖子内容
    .post-detail-body {
      padding: 20px 10px;
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: cover !important;
      }
      .post-detail-content {
        padding: 0 40px;

        .cover {
          width: 100%;
          border-radius: 8px;
        }
        .post-intro {
          margin: 20px 0;
          text-align: left;
          font-size: @post-intro-font-size;
          word-break: break-all;
        }
        .post-detail-content-footer {
          text-align: left;
          font-size: @post-detail-content-footer-font-size;
          color: @post-detail-content-footer-color;
          i {
            margin-right: 4px;
            color: @post-detail-content-footer-color !important;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
// 评论
.post-detail-comments {
  padding: 10px 40px 10px 10px;
  .ant-comment-inner {
    padding: 0;
    .ant-comment-content-detail {
      padding: 5px;
    }
  }
  .like {
    width: 100%;
    text-align: right;
    .reply {
      border: none;
    }
  }
}
.comment-list {
  .reply-list {
    width: 100%;
    .ant-comment-content {
      .ant-comment-actions {
        text-align: right;
      }
    }
  }
}
.ant-comment-actions > li > span {
  padding: 0 !important;
}
</style>
