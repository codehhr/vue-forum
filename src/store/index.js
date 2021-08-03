import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo } from "../api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 分类
    categoryId: null,
    //
    categoryName: "",
    // 登录状态
    alreadyLogin: false,
    // 用户信息
    userInfo: null,
  },
  mutations: {
    setCategory(state, payload) {
      state.categoryId = payload.categoryId;
      state.categoryName = payload.categoryName;
    },
    setLoginStatus(state, payload) {
      state.alreadyLogin = payload.alreadyLogin;
      state.userInfo = payload.userInfo;
    },
  },
  actions: {
    // 检查登录状态
    checkAlreadyLogin(context) {
      getUserInfo().then((res) => {
        if (res.code === 0) {
          context.commit("setLoginStatus", {
            alreadyLogin: true,
            userInfo: res.data,
          });
        } else {
          context.commit("setLoginStatus", {
            alreadyLogin: false,
            userInfo: null,
          });
        }
      });
    },
  },
  modules: {},
});
