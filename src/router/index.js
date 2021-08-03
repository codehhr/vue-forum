import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import UserCenter from "../views/UserCenter";
import Agreement from "../components/Agreement";
import ForgetPassword from "../components/ForgetPassword";
import HeaderPost from "../components/HeaderPost";
import AboutMe from "../components/AboutMe";
import { getUserInfo } from "../api/api";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "index",
    component: Index,
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  // 发表新帖
  {
    path: "/post",
    name: "post",
    component: HeaderPost,
    meta: {
      requireLogin: true,
    },
  },
  // 个人中心
  {
    path: "/user",
    name: "user",
    component: UserCenter,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/agreement",
    name: "agreement",
    component: Agreement,
  },
  {
    path: "/forget-password",
    name: "forgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/about",
    name: "about",
    component: AboutMe,
    meta: {
      requireLogin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 判断是否是需要登录的页面
  // 再判断是否是登陆状态
  if (to.meta.requireLogin) {
    getUserInfo().then((res) => {
      if (res.code === 0) {
        next();
      } else {
        next("/");
      }
    });
  } else {
    next();
  }
});

export default router;
