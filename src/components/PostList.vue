<template>
  <div class="postlist">
    <!-- post-list -->
    <div class="post-list">
      <!-- 设置图片尺寸 -->
      <div class="set-img-size">
        <a-button @click="plusImgSize" icon="plus"></a-button>
        <a-button @click="minusImgSize" icon="minus"></a-button>
      </div>
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
            <h2 class="post-announcement">风云论坛</h2>
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
          class="post-loadmore-list"
          :loading="loading"
          item-layout="horizontal"
          :data-source="postList"
        >
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            class="loadmore"
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
          <a-list-item
            class="post-list-item"
            slot="renderItem"
            slot-scope="item"
          >
            <!-- skeleton start -->
            <van-skeleton
              animate
              title
              avatar
              :row="3"
              row-width="78vw"
              :loading="skeletonLoading"
            >
              <div class="post-item-content">
                <a-avatar
                  class="post-item-avatar"
                  slot="avatar"
                  :src="
                    item
                      ? item.avatar
                      : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
                  "
                />
                <div class="post-item-middle">
                  <span class="username" v-text="item.userName"></span>
                  <div class="des">
                    <div class="des-intro">
                      <div class="title" v-text="item.title"></div>
                      <div class="subtitle" v-text="item.subTitle"></div>
                      <div class="des-intro-inner">
                        <div class="intro" v-html="item.intro"></div>
                        <van-image
                          class="cover"
                          :src="item.coverImgUrl"
                          :alt="item.title"
                          :width="imgSize ? imgSize : '80%'"
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
                      <div class="post-item-fooetr-right">
                        <van-button
                          class="like-btn"
                          @click="like(item.postsId)"
                        >
                          <a-icon
                            :theme="item.zan > 0 ? 'filled' : 'outlined'"
                            type="like"
                          />
                        </van-button>
                        <!-- 点击进入详情页 -->
                        <van-button
                          @click="showPostDetail(item)"
                          class="go-to-post-detail"
                          >详情</van-button
                        >
                        <!-- <router-link
                          :to="{
                            name: 'PostDetail',
                            params: { postsId: item.postsId },
                          }"
                        >
                          <van-button class="go-to-post-detail"
                            >详情</van-button
                          >
                        </router-link> -->
                      </div>
                    </div>
                    <!-- 帖子赞数 -->
                    <div class="like-num">
                      <span> {{ item.zan }} 人觉得很赞 </span>
                    </div>
                  </div>
                </div>
                <div class="readnum">
                  <a-icon type="eye" />
                  <span>
                    {{ item.readNum }}
                  </span>
                </div>
              </div>
            </van-skeleton>
            <!-- skeleton end -->
          </a-list-item>
        </a-list>
        <!-- 触底加载版 end -->
      </van-pull-refresh>
      <!-- 下拉刷新 end -->

      <!-- 弹出层版查看帖子详情 -->
      <van-popup class="post-popup" position="right" v-model="postDetailShow">
        <post-detail
          :postItemAndCategoryList="passDataToPostDetail()"
        ></post-detail>
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
      // 默认不触发加载更多
      loading: true,
      // 加载更多
      loadingMore: false,
      // 显示加载更多按钮
      showLoadingMore: true,
      // 下拉刷新
      isLoading: false,
      // 分类名字
      postCategoryList: [],
      // 单个帖子 ( 用于传入详情页显示详情 )
      postItem: {},
      // 骨架屏幕
      skeletonLoading: true,
    };
  },
  methods: {
    // +
    plusImgSize() {
      if (this.imgSize.split("%")[0] > 100) {
        this.$store.commit("setImgSize", `100%`);
      } else {
        let tempSize = Number(this.imgSize.split("%")[0]) + 2;
        this.$store.commit("setImgSize", `${tempSize}%`);
      }
    },
    // -
    minusImgSize() {
      if (this.imgSize.split("%")[0] < 10) {
        this.$store.commit("setImgSize", `0%`);
      } else {
        let tempSize = Number(this.imgSize.split("%")[0]) - 2;
        this.$store.commit("setImgSize", `${tempSize}%`);
      }
    },
    // 获取帖子列表
    initPostsList() {
      // 获取页数
      getPostList({
        categoryId: this.categoryId,
        title: this.searchTitle,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.code === 0) {
          this.$store.dispatch("setReversePostList", res);
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 开局先判断类别 (分类标签)
    getPostCategoryList() {
      getTopicsList().then((res) => {
        res.rows.forEach((item) => {
          this.postCategoryList.push(item);
        });
      });
    },
    // 返回分类标签名
    getCategoryName(categoryId) {
      let name = "";
      this.postCategoryList.forEach((item) => {
        if (item.categoryId == categoryId) {
          name = item.name;
        }
      });
      return name;
    },
    // 下拉刷新
    onRefresh() {
      this.isLoading = true;
      this.initPostsList();
      setTimeout(() => {
        this.$message.success(" 刷新成功 ~");
        this.isLoading = false;
      }, 500);
    },
    // 触底加载更多
    onLoadMore() {
      this.pageNum--;
      if (this.pageNum <= 0) {
        this.$message.warning("没有更多了 ~");
      } else {
        this.loadingMore = true;
        getPostList({
          categoryId: this.categoryId,
          title: this.searchTitle,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }).then((res) => {
          if (res.code === 0) {
            this.$store.commit(
              "setPostList",
              this.postList.concat(res.rows.reverse())
            );
            this.$nextTick(() => {
              window.dispatchEvent(new Event("resize"));
            });
            this.$store.commit("setPreviewImgList", res.rows);
            // 结束加载动画
            this.loadingMore = false;
          } else {
            console.log(res.msg);
          }
        });
      }
    },
    // 显示帖子详情 (item 为当前帖子)
    showPostDetail(item) {
      // 显示详情页
      this.postDetailShow = true;
      this.postItem = item;
      this.passDataToPostDetail();
    },
    // 页面传值 ( post-list -> postDetail )
    passDataToPostDetail() {
      return {
        postItem: this.postItem,
        postCategoryList: this.postCategoryList,
      };
    },
    // 预览图片
    previewImg(item) {
      // 从当前图片开始显示
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
    like(postsId) {
      console.log(postsId);
    },
  },
  components: {
    Announcement,
    PostDetail,
  },
  created() {
    // 获取帖子列表
    this.initPostsList();
    // 获取帖子分类标签名
    this.getPostCategoryList();
    // 加载状态
    this.loading = false;
  },
  mounted() {
    // 骨架屏
    this.skeletonLoading = false;
  },
  computed: {
    ...mapState({
      postList: "postList",
      categoryId: "categoryId",
      color: "color",
      pageSize: "pageSize",
      title: "title",
      total: "total",
      searchTitle: "searchTitle",
      previewImgList: "previewImgList",
      imgSize: "imgSize",
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
  position: relative;
  height: calc(100vh - 46px);
  overflow: hidden;
  .set-img-size {
    position: absolute;
    bottom: 4%;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 999;
    button:nth-of-type(1) {
      border-bottom: none;
    }
  }
  .post-popup {
    width: 100%;
  }
  .announcement {
    background-color: #e8ecf3;
    letter-spacing: 0.6rem;
  }

  .pull-refresh {
    height: 100%;
    overflow-y: auto;
    .post-announcement {
      font-size: @post-list-title-font-size;
    }
    .post-loadmore-list {
      width: 100%;
      min-height: 350px;
    }
  }
}
</style>

<style lang="less">
@main-bg-color: #e8ecf3;
@main-color: #667c99;
@username-font-size: 0.7rem;
@font-size: 0.9rem;
@intro-font-size: 1rem;
@intro-color: #666666;
@sendtime-font-size: 0.6rem;

// 自定义刷新
.doge {
  width: 140px;
  height: 72px;
  margin: 8px auto;
  border-radius: 4px;
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
          .subtitle {
            padding-left: 40px;
            text-align: left;
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
              text-align: center;
              transition: all 0.4s;
              img {
                border-radius: 6px;
                transition: all 0.4s;
              }
            }
            // introduction
            .intro {
              padding: 5px 40px 15px 0;
              width: 100%;
              text-align: center;
              color: @intro-color;
              font-size: @intro-font-size;
            }
          }
          .post-item-fooetr {
            margin: 10px 0;
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
                      padding: 1px 6px 0;
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
              display: flex;
              align-items: center;
              justify-content: space-between;
              .like-btn {
                min-width: 24px;
                height: 24px;
              }
              .go-to-post-detail {
                position: relative;
                top: -2px;
                margin-left: 4px;
                width: 40px;
                height: 24px;
                border-radius: 4px;
                font-size: @font-size;
                color: @main-color;
                background-color: transparent;
              }
            }
          }
          .like-num {
            padding-left: 10px;
            text-align: left;
          }
        }
      }
      // 阅读量
      .readnum {
        position: relative;
        top: 5px;
        right: 5px;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        font-size: 0.7rem;
        background-color: @main-bg-color;
        i {
          margin-right: 4px;
          font-size: 0.5rem;
        }
      }
    }
  }
  .loadmore {
    padding-bottom: 60px;
  }
}
</style>
