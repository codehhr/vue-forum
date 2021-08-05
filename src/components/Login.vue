<template>
  <div class="login">
    <go-home></go-home>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleLoginSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          autocomplete
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          autocomplete
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          class="remember-me"
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          记住我
        </a-checkbox>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
      </a-form-item>
      <div class="form-footer">
        <router-link class="register-right-now" to="/register"
          >立即注册</router-link
        >
        <router-link class="forgot-password" to="/forget-password"
          >忘记密码</router-link
        >
      </div>
    </a-form>
  </div>
</template>

<script>
import { login } from "../api/api";
import GoHome from "../components/GoHome";

export default {
  name: "Login",
  methods: {
    handleLoginSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          login({
            username: values.username,
            password: values.password,
          })
            .then((res) => {
              // 登录成功
              if (res.code === 0) {
                this.$message.success("登录成功");
                this.$store.commit("setLoginStatus", {
                  alreadyLogin: true,
                  userInfo: res.data,
                });
                this.$router.push({ name: "index" });
              } else {
                this.$message.warning(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  components: {
    GoHome,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
};
</script>

<style lang="less" scoped>
.login-form {
  margin-top: 10px;
  padding: 10px 40px;
  .remember-me {
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
  }
  .form-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
      height: 20px;
      font-size: 1.2rem;
    }
  }
}
</style>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
