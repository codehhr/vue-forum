import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";
import Login from "../components/Login";
import Register from "../components/Register";
import UserCenter from "../views/UserCenter";
import Agreement from "../components/Agreement";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/user",
    name: "user",
    component: UserCenter,
  },
  {
    path: "/agreement",
    name: "agreement",
    component: Agreement,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
