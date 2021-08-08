import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo, getPostList } from "../api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 分类
    categoryId: Number(localStorage.getItem("categoryId")) || "",
    //
    categoryList: [],
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
    // 页码
    pageNum: 1,
    // 每页个数
    pageSize: 10,
    // 数据个数
    total: null,
    // 图片预览数组
    previewImgList: [],
    // 搜索的标题
    searchTitle: "",
    // 图片尺寸
    imgSize: "80%",
    //
    postDetailShow: false,
  },
  mutations: {
    setPostDetailShow(state, payload) {
      state.postDetailShow = payload;
    },
    setImgSize(state, payload) {
      state.imgSize = payload;
    },
    setSearchTitle(state, payload) {
      state.searchTitle = payload;
    },
    setTotal(state, payload) {
      state.total = payload;
    },
    clearPreviewImgList(state, payload) {
      state.previewImgList = payload;
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    setPageNum(state, payload) {
      state.pageNum = payload;
    },
    setPageSize(state, payload) {
      state.pageSize = payload;
    },
    setPostList(state, payload) {
      state.postList = payload;
    },
    setCategoryId(state, payload) {
      state.categoryId = payload;
    },
    setLoginStatus(state, payload) {
      state.alreadyLogin = payload.alreadyLogin;
      state.userInfo = payload.userInfo;
    },
    // 把所有封面存于数组,用户图片预览
    setPreviewImgList(state, payload) {
      let tempPreviewImgList = [];
      payload.forEach((item) => {
        tempPreviewImgList.push(item.coverImgUrl);
      });
      state.previewImgList = state.previewImgList.concat(tempPreviewImgList);
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
    //
    // 开始加载时获取帖子列表
    setReversePostList(context, payload) {
      context.commit(
        "setPageNum",
        Math.ceil(payload.total / this.state.pageSize)
      );
      context.commit("setTotal", payload.total);
      getPostList({
        categoryId: this.state.categoryId,
        pageNum: this.state.pageNum,
        title: this.state.searchTitle,
        pageSize: this.state.pageSize,
      }).then((res) => {
        context.commit("setPostList", res.rows.reverse());
        // 把所有封面存于数组,用户图片预览
        context.commit("clearPreviewImgList", []);
        context.commit("setPreviewImgList", res.rows);
      });
    },
  },
  modules: {},
});
