<template>
  <div class="user">
    <go-back></go-back>
    <!-- card start -->
    <a-card hoverable style="width: 100%">
      <img
        slot="cover"
        alt="封面"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <template slot="actions" class="ant-card-actions">
        <a-upload
          name="avatarfile"
          class="upload-avatar"
          action="/forum/api/system/user/profile/update/avatar/nos"
          @change="handleChange"
          :showUploadList="false"
        >
          <a-icon key="setting" type="setting" class="setting" />
        </a-upload>
        <a-icon key="edit" type="edit" @click="showModifyUserInfo" />
        <a-icon key="ellipsis" type="ellipsis" @click="extra" />
      </template>
      <a-card-meta
        :title="userInfo ? userInfo.userName : '昵称'"
        :description="userInfo ? userInfo.remark : '这个人很懒，什么都没有写……'"
      >
        <a-avatar
          slot="avatar"
          :src="
            userInfo
              ? userInfo.avatar
              : 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
          "
        />
      </a-card-meta>
    </a-card>
    <!-- card end -->

    <div class="user-info">
      <div class="user-info-item">
        <div class="email">
          <span>邮箱 : </span>{{ userInfo ? userInfo.email : "email" }}
        </div>
      </div>
      <div class="user-info-item">
        <div class="phonenumber">
          <span>手机号 : </span
          >{{ userInfo ? userInfo.phonenumber : "phonenumber" }}
        </div>
      </div>
      <div class="user-info-item">
        <div class="sex">
          <span>性别 : </span>
          {{ userInfo ? (userInfo.sex == 0 ? "男" : "女") : "sex" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GoBack from "../components/GoBack";

export default {
  name: "UserCenter",
  methods: {
    extra() {
      this.$message.warning("啥也没有");
    },
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
    showModifyUserInfo() {
      this.$router.push({ name: "modifyinfo" });
    },
  },

  components: {
    GoBack,
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
@user-info-item-span-font-size: 1.2rem;
@user-info-item-font-size: 1rem;
@main-color: #4d698e;

.user {
  height: 100vh;
  .user-info {
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .user-info-item {
      margin: 10px 0;
      height: 36px;
      color: #575a5a;
      font-size: @user-info-item-font-size;
      span {
        font-size: @user-info-item-span-font-size;
        color: @main-color;
      }
    }
  }
}
</style>
<style lang="less">
.ant-card-actions > li {
  margin: 0 !important;
  padding: 10px 0;
}
</style>
