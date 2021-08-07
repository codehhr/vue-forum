<template>
  <div class="user">
    <go-home></go-home>
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
        <a-icon key="edit" type="edit" @click="showModifyUserInfoPopup" />
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
<style lang="less">
.ant-card-actions > li {
  margin: 0 !important;
  padding: 10px 0;
}
</style>
