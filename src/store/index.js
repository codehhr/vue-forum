import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 分类
    category: null,
    // 登录状态
    alreadyLogin: false,
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload;
    },
    setLoginStatus(state, payload) {
      state.alreadyLogin = payload;
    },
  },
  actions: {},
  modules: {},
});
