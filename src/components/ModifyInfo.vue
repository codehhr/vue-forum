<template>
  <div class="modifyinfo">
    <go-back></go-back>
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
  </div>
</template>

<script>
import GoBack from "./GoBack";
import { modifyUserInfo } from "../api/api";

export default {
  name: "ModifyInfo",
  methods: {
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
              this.$router.back(-1);
            } else {
              this.$message.success(res.msg);
            }
          });
        }
      });
    },
  },
  components: {
    GoBack,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
};
</script>

<style lang="less">
.modifyinfo {
  width: 100%;
  height: 100%;
  .modifyinfo-form {
    padding: 40px;
    .submit-btn {
      width: 100%;
    }
  }
}
</style>
