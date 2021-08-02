<template>
  <a-form class="register-form" :form="form" @submit="handleRegisterSubmit">
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
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        autocomplete
        placeholder="请输入密码"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        autocomplete
        placeholder="请确认您的密码"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ],
          },
        ]"
        autocomplete
        placeholder="请输入昵称"
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
            :disabled="registerCodeBtnDisabled"
            class="get-code"
            @click="getRegisterCode"
          >
            <span v-show="!hadRequestRegisterCode">获取验证码</span>
            <span v-show="hadRequestRegisterCode">{{ registerSecond }}</span>
          </a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit" class="register-form-btn">
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { register, getCode } from "../api/api";

export default {
  name: "Register",
  data() {
    return {
      // 获取注册验证码定时器
      registerCodeInterval: null,
      // 获取验证码按钮禁用
      registerCodeBtnDisabled: false,
      // 已经请求验证码
      hadRequestRegisterCode: false,
      // 请求验证码倒计时
      registerSecond: 1 * 60,
      // 注册验证规则
      confirmDirty: false,
      autoCompleteResult: [],
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
    // 注册 start
    handleRegisterSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          register(
            values.loginName,
            values.password,
            values.userName,
            values.phonenumber,
            values.code
          ).then((res) => {
            console.log(res);
            if (res.code === 0) {
              this.$router.push({ name: "login" });
              this.$message.success("注册成功,现在可以登录啦~");
            } else {
              this.$message.success(res.msg);
            }
          });
        }
      });
    },

    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    // 验证密码 start
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码输入不一致!");
      } else {
        callback();
      }
    },

    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    // 验证密码 end

    // 获取注册验证码
    getRegisterCode() {
      let that = this;
      // 获取验证码倒计时
      function countDown() {
        // 按钮禁用
        that.registerCodeBtnDisabled = true;

        // 按钮倒计时 start
        that.hadRequestRegisterCode = true;
        if (!that.registerCodeInterval) {
          that.registerCodeInterval = setInterval(() => {
            if (that.registerSecond <= 0) {
              clearInterval(that.registerCodeInterval);
              that.registerCodeBtnDisabled = false;
              that.hadRequestRegisterCode = false;
            } else {
              that.registerSecond--;
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

    // 注册 end
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
};
</script>

<style scoped lang="less">
.register-form {
  padding: 20px;
  .get-code {
    width: 100%;
  }
  .register-form-btn {
    width: 100%;
    width: 100%;
  }
}
</style>
