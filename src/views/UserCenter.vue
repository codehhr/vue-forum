<template>
  <div class="user">
    <go-home></go-home>
    <!-- 头像 start -->
    <div class="card">
      <div class="mask"></div>
      <div class="change-avatar">
        <div
          class="avatar"
          :style="
            `background: url(${
              alreadyLogin
                ? userInfo.avatar
                  ? userInfo.avatar
                  : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
                : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
            }) 50% 50% no-repeat`
          "
        ></div>
        <div class="username">
          {{ userInfo ? userInfo.userName : "~" }}
        </div>

        <!-- 头像上传 start -->
        <a-upload
          name="avatarfile"
          action="/forum/api/system/user/profile/update/avatar/nos"
          :headers="headers"
          @change="handleChange"
          :showUploadList="false"
        >
          <div class="upload">
            <a-button class="upload-btn">
              <a-icon class="upload-icon" type="upload" />
              <span>更改头像</span>
            </a-button>
          </div>
        </a-upload>
        <!-- 头像上传 end -->
      </div>
    </div>

    <!-- 头像 end -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoHome from "../components/GoHome";

export default {
  name: "UserCenter",
  data() {
    return {
      headers: {
        // authorization: "authorization-text",
      },
    };
  },
  methods: {
    // 更改头像
    handleChange(info) {
      if (this.$store.state.alreadyLogin) {
        // if (info.file.status !== "uploading") {
        //   console.log(info.file, info.fileList);
        // }
        if (info.file.status === "done") {
          this.$message.success(`${info.file.name} 上传成功`);
          this.$store.dispatch("checkAlreadyLogin");
        } else if (info.file.status === "error") {
          this.$message.error(`${info.file.name} 头像上传失败`);
        }
      } else {
        this.$message.warning("请登录");
      }
    },
  },
  components: {
    GoHome,
  },
  computed: {
    ...mapState({
      alreadyLogin: "alreadyLogin",
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped lang="less">
.user {
  height: 100vh;
  .card {
    position: relative;
    height: 40%;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #494f5ca6;
      z-index: -1;
    }
    background-size: cover;
    .change-avatar {
      padding-bottom: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-size: cover !important;
        overflow: hidden;
      }
      .username {
        margin: 10px 0;
        font-size: 1.2rem;
        color: #000000;
      }
      .upload {
        .upload-btn {
          border: none;
        }
      }
    }
  }
}
</style>
