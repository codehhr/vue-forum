<template>
  <a-form
    class="forget-password-form"
    :form="form"
    @submit="handleForgetPasswordSubmit"
  >
    <a-form-item v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'loginName',
          {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          },
        ]"
        placeholder="请输入用户名"
        autocomplete
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
            ],
          },
        ]"
        autocomplete
        placeholder="请输入新的密码"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-input
        autocomplete
        placeholder="请输入手机号"
        v-decorator="[
          'phonenumber',
          {
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
          },
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">
            +86
          </a-select-option>
          <a-select-option value="87">
            +87
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-row :gutter="24">
        <a-col :span="16">
          <a-input
            v-decorator="[
              'code',
              {
                rules: [
                  {
                    message: '请输入验证码!',
                  },
                ],
              },
            ]"
            autocomplete
            placeholder="请输入验证码"
            title="请输入验证码"
          />
        </a-col>
        <a-col :span="8">
          <a-button
            :disabled="forgetPasswordCodeBtnDisabled"
            class="get-code"
            @click="getForgetPasswordCode"
          >
            <span v-show="!hadRequestForgetPasswordCode">获取验证码</span>
            <span v-show="hadRequestForgetPasswordCode">{{
              forgetPasswordSecond
            }}</span>
          </a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit" class="forget-password-btn">
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { forgetPassword, getCode } from "../api/api";

export default {
  name: "ForgetPassword",
  data() {
    return {
      // 获取注册验证码定时器
      forgetPasswordCodeInterval: null,
      // 获取验证码按钮禁用
      forgetPasswordCodeBtnDisabled: false,
      // 已经请求验证码
      hadRequestForgetPasswordCode: false,
      // 请求验证码倒计时
      forgetPasswordSecond: 1 * 60,

      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  methods: {
    // 忘记密码 start
    handleForgetPasswordSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          forgetPassword(
            values.loginName,
            values.password,
            values.phonenumber,
            values.code
          ).then((res) => {
            if (res.code === 0) {
              this.$router.push({ name: "login" });
              this.$message.success("操作成功,现在可以登录啦~");
            } else {
              this.$message.success(res.msg);
            }
          });
        }
      });
    },

    // 获取验证码
    getForgetPasswordCode() {
      let that = this;
      // 获取验证码倒计时
      function countDown() {
        // 按钮禁用
        that.forgetPasswordCodeBtnDisabled = true;

        // 按钮倒计时 start
        that.hadRequestForgetPasswordCode = true;
        if (!that.forgetPasswordCodeInterval) {
          that.forgetPasswordCodeInterval = setInterval(() => {
            if (that.forgetPasswordSecond <= 0) {
              clearInterval(that.forgetPasswordCodeInterval);
              that.forgetPasswordCodeBtnDisabled = false;
              that.hadRequestForgetPasswordCode = false;
            } else {
              that.forgetPasswordSecond--;
            }
          }, 1000);
        }
        // 按钮倒计时 end
      }

      // 获取验证码
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          getCode(values.phonenumber).then((res) => {
            if (res.code === 0) {
              countDown();
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      });
    },

    // 忘记密码 end
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
};
</script>

<style scoped lang="less">
.forget-password-form {
  padding: 20px;
  .get-code {
    width: 100%;
  }
  .forget-password-btn {
    width: 100%;
    width: 100%;
  }
}
</style>
