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
        <div class="remark">
          {{
            userInfo
              ? userInfo.remark == 0
                ? "这个人很懒，什么都没有写……"
                : userInfo.remark
              : "这个人很懒，什么都没有写……"
          }}
        </div>

        <!-- 头像上传 start -->
        <a-upload
          name="avatarfile"
          action="/forum/api/system/user/profile/update/avatar/nos"
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

    <div class="user-info">
      <div class="user-info-item">
        <div class="username">
          <span>昵称 : </span>{{ userInfo ? userInfo.userName : "userName" }}
        </div>
      </div>
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
      <van-cell class="modify-userinfo-btn" @click="showModifyUserInfoPopup">
        <a-button icon="setting">修改个人信息</a-button>
      </van-cell>
      <van-popup
        class="modify-userinfo-popup"
        position="right"
        v-model="modifyUserInfoShow"
      >
        <go-back @close="closeModifyUserInfoPopup"></go-back>
        <a-form
          id="modifyinfo-form"
          :form="form"
          class="modifyinfo-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="['userName', {}]"
              autocomplete
              placeholder="请输入新的昵称"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['email', {}]"
              placeholder="请输入新的邮箱地址"
              autocomplete
            />
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['phonenumber', {}]"
              autocomplete
              placeholder="请输入新的手机号"
              style="width: 100%"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['sex', {}]"
              autocomplete
              placeholder="请输入性别"
              style="width: 100%"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['remark', {}]"
              autocomplete
              placeholder="请输入新的个性签名"
              style="width: 100%"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="submit-btn">
              提交
            </a-button>
          </a-form-item>
        </a-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { modifyUserInfo } from "../api/api";
import { mapState } from "vuex";
import GoHome from "../components/GoHome";
import GoBack from "../components/GoBack";

export default {
  name: "UserCenter",
  data() {
    return {
      modifyUserInfoShow: false,
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
    showModifyUserInfoPopup() {
      this.modifyUserInfoShow = true;
    },
    // 修改个人信息
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          modifyUserInfo({
            userName: values.userName,
            email: values.email,
            phonenumber: values.phonenumber,
            sex: values.sex,
            remark: values.remark,
          }).then((res) => {
            if (res.code === 0) {
              this.$message.success("修改成功 ~");
              this.$store.dispatch("checkAlreadyLogin");
              this.modifyUserInfoShow = false;
            } else {
              this.$message.success(res.msg);
            }
          });
        }
      });
    },
    closeModifyUserInfoPopup(data) {
      this.modifyUserInfoShow = data;
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  components: {
    GoHome,
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
      .username,
      .remark {
        margin: 6px 0;
        font-size: 1.2rem;
        color: #000000aa;
      }
      .upload {
        .upload-btn {
          border: none;
        }
      }
    }
  }
  .user-info {
    padding: 40px;
    height: calc(100vw - 46px);
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
  .modify-userinfo-popup {
    width: 100%;
    height: 100%;
    .modifyinfo-form {
      padding: 40px;
      .submit-btn {
        width: 100%;
      }
    }
  }
}
</style>
