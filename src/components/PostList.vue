<template>
  <div class="postlist">
    <!-- post-list -->
    <div class="post-list">
      <!-- 下拉刷新 start -->
      <van-pull-refresh
        class="pull-refresh"
        :head-height="80"
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <!-- 公告 -->
        <announcement>
          <template v-slot:title>
            <h2 class="post-list-title">亿个人论坛</h2>
          </template>
        </announcement>
        <!-- 下拉提示 , 通过 scale 实现一个缩放效果 -->
        <template #pulling="props">
          <img
            class="doge"
            src="https://img01.yzcdn.cn/vant/doge.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
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

        <!-- post-content start -->
        <!-- ******************************************************
        分页版 start
       ****************************************************** -->
        <!-- <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="postList"
      >
        <div slot="footer">FOOTER</div>
        <a-list-item slot="renderItem" key="index" slot-scope="item">
          <template v-for="(item, index) in actions" slot="actions">
            <span :key="index">
              <a-icon :type="item.type" style="margin-right: 8px" />
              {{ item.text }}
            </span>
          </template>
          <img
            slot="extra"
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.href">{{ item.title }}</a>
            <a-avatar slot="avatar" :src="item.avatar" />
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </a-list> -->
        <!-- ******************************************************
        分页版 end
       ****************************************************** -->
        <!-- post-content end -->

        <!-- 触底加载版 start -->
        <a-list
          class="demo-loadmore-list"
          :loading="loading"
          item-layout="horizontal"
          :data-source="postList"
        >
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{
              textAlign: 'center',
              marginTop: '12px',
              height: '32px',
              lineHeight: '32px',
            }"
          >
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">加载更多</a-button>
          </div>
          <a-list-item loading="true" slot="renderItem" slot-scope="item">
            <div class="post-item-content">
              <a-avatar
                class="post-item-avatar"
                slot="avatar"
                :src="item.avatar"
              />
              <div class="post-item-middle">
                <span class="username" v-text="item.userName"></span>
                <div class="des">
                  <div class="des-intro">
                    <div class="title" v-text="item.title"></div>
                    <div class="des-intro-inner">
                      <div class="intro" v-html="item.intro"></div>
                      <van-image
                        class="cover"
                        :src="item.coverImgUrl"
                        :alt="item.title"
                        lazy-load
                        @click="previewImg(item)"
                      />
                    </div>
                  </div>
                  <div class="post-item-fooetr">
                    <div class="post-item-fooetr-left">
                      <announcement>
                        <template v-slot:category>
                          <div>
                            <a-tag color="#fefefe">
                              <h2
                                :style="{ color: color }"
                                class="category-name"
                                v-text="getCategoryName(item.categoryId)"
                              ></h2>
                            </a-tag>
                          </div>
                        </template>
                      </announcement>
                      <span class="sendtime">{{ item.sendTime }} </span>
                    </div>
                    <div
                      @click="showPostDetail(item)"
                      class="post-item-fooetr-right"
                    >
                      <van-button class="go-to-post-detail">详情</van-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="readnum">{{ item.readNum }}</div>
            </div>
          </a-list-item>
        </a-list>
        <!-- 触底加载版 end -->
      </van-pull-refresh>
      <!-- 下拉刷新 end -->
      <van-popup class="post-popup" position="right" v-model="postDetailShow">
        <post-detail :postDetail="postItem"></post-detail>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPostList, getTopicsList } from "../api/api";
// getPostList(categoryId = 2, pageNum = 1, pageSize = 20)
import Announcement from "./Announcement";
import PostDetail from "./PostDetail";
import { ImagePreview } from "vant";

export default {
  name: "PostList",
  data() {
    return {
      /*
        分页版
       */
      // pagination: {
      //   onChange: (page) => {
      //     console.log(page);
      //   },
      //   pageSize: 10,
      // },
      // // 点赞收藏评论
      // actions: [
      //   { type: "like-o", text: "156" },
      //   { type: "star-o", text: "156" },
      //   { type: "message", text: "2" },
      // ],

      /*
        触底加载版
      */
      // 默认不加载
      loading: true,
      // 加载更多
      loadingMore: false,
      // 显示加载更多按钮
      showLoadingMore: true,
      // 下拉刷新
      isLoading: false,
      // 分类名字
      postCategoryNameList: [],
      // 单个帖子
      postItem: {},
      // 图片预览数组
      previewImgList: [],
    };
  },
  methods: {
    // 开局先判断类别
    getPostCategoryNameList() {
      getTopicsList().then((res) => {
        res.rows.forEach((item) => {
          this.postCategoryNameList.push(item.name);
        });
      });
    },
    // 分类标签名
    getCategoryName(categoryId) {
      return this.postCategoryNameList[categoryId - 1];
    },
    // 下拉刷新
    onRefresh() {
      // 下拉刷新起始页
      this.pageNum = 1;
      // 重置加载到底状态
      this.$store.commit("setLoadEnd", false);
      getPostList({
        categoryId: this.categoryId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.code === 0) {
          this.$store.commit("setPostList", res.rows);
          setTimeout(() => {
            this.$message.success(" 刷新成功 ~");
            this.isLoading = false;
          }, 500);
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 触底加载更多
    onLoadMore() {
      this.pageNum++;
      this.loadingMore = true;
      getPostList({
        categoryId: this.categoryId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          if (this.pageNum * this.pageSize >= res.total) {
            if (this.loadEnd) {
              this.$message.warning("没有更多了 ~");
            } else {
              this.$store.commit("setPostList", this.postList.concat(res.rows));
              this.$store.commit("setLoadEnd", true);
            }
          } else {
            this.$store.commit("setPostList", this.postList.concat(res.rows));
            this.$nextTick(() => {
              window.dispatchEvent(new Event("resize"));
            });
          }
          // 结束加载动画
          this.loadingMore = false;
        } else {
          console.log(res.msg);
        }
      });
    },
    // 获取帖子列表
    getPostsList() {
      getPostList({
        categoryId: this.categoryId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.code === 0) {
          this.$store.commit("setPostList", res.rows);
          // 把所有封面存于数组,用户图片预览
          res.rows.forEach((item) => {
            this.previewImgList.push(item.coverImgUrl);
          });
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 显示帖子详情
    showPostDetail(item) {
      this.postItem = {};
      this.$store.commit("setPostDetailShow", true);
      this.postItem = item;
    },
    // 预览图片
    previewImg(item) {
      let index;
      this.previewImgList.forEach((v, i) => {
        if (v == item.coverImgUrl) {
          index = i;
        }
      });
      ImagePreview({
        images: this.previewImgList,
        startPosition: index,
      });
    },
  },
  components: {
    Announcement,
    PostDetail,
  },
  created() {
    this.getPostsList();
    this.getPostCategoryNameList();
    this.loading = false;
  },
  computed: {
    ...mapState({
      postList: "postList",
      categoryId: "categoryId",
      categoryName: "categoryName",
      color: "color",
      loadEnd: "loadEnd",
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
    postDetailShow: {
      get() {
        return this.$store.state.postDetailShow;
      },
      set(payload) {
        this.$store.commit("setPostDetailShow", payload);
      },
    },
  },
};
</script>

<style scoped lang="less">
@post-list-title-font-size: 1rem;

.post-list {
  height: calc(100vh - 46px);
  overflow: hidden;
  .post-popup {
    width: 100%;
  }
  .announcement {
    background-color: #e8ecf3;
    letter-spacing: 0.6rem;
  }
  .pull-refresh {
    height: calc(100% - 10px);
    overflow-y: auto;
    .post-list-title {
      font-size: @post-list-title-font-size;
    }
  }
}
</style>

<style lang="less">
@main-bg-color: #e8ecf3;
@main-color: #667c99;
@username-font-size: 0.7rem;
@font-size: 0.9rem;
@intro-font-size: 0.8rem;
@intro-color: #666666;
@sendtime-font-size: 0.6rem;

// 自定义刷新
.doge {
  width: 140px;
  height: 72px;
  margin: 8px auto;
  border-radius: 4px;
}
.demo-loadmore-list {
  min-height: 350px;
}
.ant-list-split .ant-list-item {
  border: none !important;
}

.ant-list {
  // 每一项
  .ant-list-item {
    padding: 10px 10px 0;
    width: 100%;
    .post-item-content {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      // 头像
      .post-item-avatar {
        img {
          width: 32px;
        }
      }
      // 中间部分
      .post-item-middle {
        width: calc(100% - 76px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .username {
          margin: 2px 3px 10px;
          font-size: @username-font-size;
          color: #282c2e;
        }
        // 描述
        .des {
          width: 100%;
          overflow: hidden;
          .title {
            padding-left: 10px;
            text-align: left;
            font-size: @font-size;
          }
          .des-intro-inner {
            padding: 0 10px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            // 封面
            .cover {
              transition: all 0.4s;
              // height: 0;
              overflow: hidden;
              img {
                border-radius: 6px;
                width: 100%;
              }
            }
            // introduction
            .intro {
              margin: 5px 0;
              width: 100%;
              text-align: center;
              color: @intro-color;
              font-size: @intro-font-size;
            }
          }
          .post-item-fooetr {
            margin: 5px 0;
            padding-left: 10px;
            width: 100%;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .post-item-fooetr-left {
              height: 100%;
              display: flex;
              align-items: center;
              overflow: hidden;
              .announcement {
                height: 100%;
                float: left;
                letter-spacing: 0;
                background-color: transparent;
                > div {
                  height: 100%;
                  span {
                    display: block;
                    margin: 0;
                    padding: 0;
                    border: none;
                    .category-name {
                      margin: 0;
                      padding: 0 6px;
                      height: 100%;
                      font-size: 0.6rem;
                      border-radius: 4px;
                      line-height: 1rem;
                      background-color: #696f7e;
                      color: #ffffff !important;
                    }
                  }
                }
              }
              // 发表时间
              .sendtime {
                margin: 0 5px;
                float: left;
                height: 100%;
                line-height: calc(@sendtime-font-size * 2);
                font-size: @sendtime-font-size;
                color: #aaaaaa;
              }
            }
            .post-item-fooetr-right {
              margin-right: 10px;
              button {
                width: 40px;
                height: 24px;
                border-radius: 4px;
                font-size: @font-size;
                color: @main-color;
              }
            }
          }
        }
      }
      // 阅读量
      .readnum {
        position: relative;
        top: 5px;
        right: 5px;
        padding: 4px 10px;
        border-radius: 4px;
        background-color: @main-bg-color;
      }
    }
  }
}
</style>
