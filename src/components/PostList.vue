<template>
  <div class="postlist">
    <!-- post-list -->
    <div class="post-list">
      <van-pull-refresh
        class="pull-refresh"
        :head-height="80"
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <!-- 公告 -->
        <announcement>
          <template v-slot:title>
            <div>
              <h2>亿个人论坛</h2>
            </div>
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
            <router-link
              class="go-to-post-detail"
              :to="{ name: 'postDetail', params: { postsId: item.postsId } }"
            >
              <div class="post-item-content">
                <a-avatar
                  class="post-item-avatar"
                  slot="avatar"
                  :src="item.avatar"
                />
                <div class="post-item-middle">
                  <div class="title">{{ item.title }}</div>
                  <div class="des">
                    <div class="des-intro">
                      <div class="intro">{{ item.intro }}</div>
                      <van-image
                        class="cover"
                        :src="item.coverImgUrl"
                        :alt="item.title"
                        lazy-load
                      />
                    </div>
                    <p class="sendtime">{{ item.sendTime }}</p>
                  </div>
                </div>
                <div class="readnum">{{ item.readNum }}</div>
              </div>
            </router-link>
          </a-list-item>
        </a-list>
        <!-- 触底加载版 end -->
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPostList } from "../api/api";
import Announcement from "../components/Announcement";
// getPostList(categoryId = 2, pageNum = 1, pageSize = 20)

export default {
  name: "PostList",
  data() {
    return {
      postList: [],
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
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      // 下拉刷新
      isLoading: false,
      // 页码
      pageNum: 1,
      pageSize: 20,
    };
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.pageNum = 1;
      getPostList(2, this.pageNum, this.pageSize).then((res) => {
        console.log(res.rows);
        if (res.code === 0) {
          this.postList = res.rows;
          setTimeout(() => {
            this.$message.success("刷新成功 ~");
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
      getPostList(2, this.pageNum, this.pageSize).then((res) => {
        console.log(res.rows);
        this.postList = this.postList.concat(res.rows);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event("resize"));
        });
      });
    },
    getPostsList() {
      getPostList(2, this.pageNum, this.pageSize).then((res) => {
        if (res.code === 0) {
          this.postList = res.rows;
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
  },
  components: {
    Announcement,
  },
  created() {
    this.getPostsList();
    this.loading = false;
  },
  computed: {
    ...mapState({
      categoryId: "categoryId",
    }),
  },
};
</script>

<style scoped lang="less">
.post-list {
  // padding: 12px;
  height: calc(100vh - 46px);
  overflow: hidden;
  .pull-refresh {
    height: 100%;
    overflow-y: auto;
  }
}
</style>

<style lang="less">
@main-bg-color: #e8ecf3;
@font-size: 1.2rem;
@intro-font-size: 1.1rem;
@intro-color: #666666;

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
    .go-to-post-detail {
      padding: 12px;
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
          margin: 4px 10px;
          width: calc(100% - 80px);
          // max-height: 120px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          .title {
            font-size: @font-size;
          }
          // 描述
          .des {
            overflow: hidden;
            // 发表时间
            .sendtime {
              margin: 10px 0;
              float: left;
              height: 20px;
            }
            .des-intro {
              height: calc(100% - 20px);
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              // 封面
              .cover {
                img {
                  width: 100px;
                }
              }
              // introduction
              .intro {
                margin: 10px 0;
                color: @intro-color;
                font-size: @intro-font-size;
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
}
</style>
