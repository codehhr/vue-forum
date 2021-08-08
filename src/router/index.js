import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import UserCenter from "../views/UserCenter";
import Agreement from "../components/Agreement";
import ForgetPassword from "../components/ForgetPassword";
import AboutMe from "../components/AboutMe";
import PostDetail from "../components/PostDetail";
import Post from "../components/Post";
import EditPost from "../components/EditPost";
import ModifyInfo from "../components/ModifyInfo";
import Animation from "../views/Animation";
import { getUserInfo } from "../api/api";
import Site from "../components/Site";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Animation",
    component: Animation,
    meta: {
      title: "风云论坛",
    },
  },
  // 主页
  {
    path: "/index",
    name: "index",
    component: Index,
    meta: {
      title: "风云论坛",
      keepAlive: true,
    },
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录|风云论坛",
    },
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "注册|风云论坛",
    },
  },
  // 个人中心
  {
    path: "/user",
    name: "user",
    component: UserCenter,
    meta: {
      requireLogin: true,
      title: "个人中心|风云论坛",
    },
  },
  // 修改个人信息
  {
    path: "/modifyinfo",
    name: "modifyinfo",
    component: ModifyInfo,
    meta: {
      requireLogin: true,
    },
  },
  // 发表新帖
  {
    path: "/post",
    name: "post",
    component: Post,
    meta: {
      requireLogin: true,
    },
  },
  // 编辑帖子
  {
    path: "/editpost/:postsId",
    name: "editpost",
    component: EditPost,
    meta: {
      requireLogin: true,
    },
  },
  // 帖子详情
  {
    path: "/postdetail/:postsId",
    name: "PostDetail",
    component: PostDetail,
  },
  // 协议
  {
    path: "/agreement",
    name: "agreement",
    component: Agreement,
  },
  // 忘记密码
  {
    path: "/forget-password",
    name: "forgetPassword",
    component: ForgetPassword,
  },
  // 我参与的
  {
    path: "/about",
    name: "about",
    component: AboutMe,
    meta: {
      requireLogin: true,
    },
  },
  // 关于本站
  {
    path: "/site",
    name: "site",
    component: Site,
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
        next("/login");
      }
    });
  } else {
    next();
  }
  document.title = to.meta.title;
});

export default router;
