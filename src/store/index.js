import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo, getTopicsList } from "../api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 分类
    categoryId: "",
    //
    postDetailCategoryName: "",
    // 登录状态
    alreadyLogin: false,
    // 用户信息
    userInfo: null,
    // 帖子列表
    postList: [],
    // category-tag-color
    color: "",
    // 显示帖子详情页
    postDetailShow: false,
    // 加载最后一页数据
    loadEnd: false,
  },
  mutations: {
    setLoadEnd(state, payload) {
      state.hasEnd = payload;
    },
    setPostDetailShow(state, payload) {
      state.postDetailShow = payload;
    },
    setPostList(state, payload) {
      state.postList = payload;
    },
    setCategoryId(state, payload) {
      state.categoryId = payload;
    },
    setPostDetailCategoryName(state, payload) {
      state.postDetailCategoryName = payload;
    },
    setLoginStatus(state, payload) {
      state.alreadyLogin = payload.alreadyLogin;
      state.userInfo = payload.userInfo;
    },
    setNotificate(state, payload) {
      state.hasNotificate = payload;
    },
    setTagColor(state, payload) {
      switch (payload) {
        case 1:
          state.color = "#87d068";
          break;
        case 2:
          state.color = "#2db7f5";
          break;
        case 3:
          state.color = "#4b93d1";
          break;
        case 4:
          state.color = "#00ccff";
          break;
        case 5:
          state.color = "#bf5255";
          break;
        case 6:
          state.color = "#4b8f83";
          break;
        case 7:
          state.color = "#d68b4f";
          break;
        case 8:
          state.color = "#a0e585";
          break;
        case 9:
          state.color = "#fdc086";
          break;
        case 10:
          state.color = "#9354ca";
          break;
        case 11:
          state.color = "#e8ecf3";
          break;
        case 12:
          state.color = "#a0e585";
          break;
        case 13:
          state.color = "#d68b4f";
          break;
        case 14:
          state.color = "#bf5255";
          break;
        case 15:
          state.color = "#00ccff";
          break;
        case 16:
          state.color = "#4b93d1";
          break;
        case 17:
          state.color = "#2db7f5";
          break;
        default:
          state.color = "#494f5c";
          break;
      }
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
    // 帖子详情页分类标签
    setPostDetailCategoryName(context, payload) {
      getTopicsList().then((res) => {
        let postDetailCategoryNameList = [];
        res.rows.forEach((item) => {
          postDetailCategoryNameList.push(item.name);
        });
        context.commit(
          "setPostDetailCategoryName",
          postDetailCategoryNameList[payload - 1]
        );
        context.commit("setTagColor", payload);
      });
    },
  },
  modules: {},
});
