import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: null,
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload;
    },
  },
  actions: {},
  modules: {},
});
