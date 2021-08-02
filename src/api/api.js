import axios from "./http";

// 单独管理接口

// 获取专题列表
export function getTopicsList() {
  return axios.post("/forum/api/bbs/bbsCategory/open/list");
}

// 登录
export function login(username, password) {
  let formData = new FormData();
  formData.append("username", username);
  formData.append("rememberMe", true);
  formData.append("password", password);
  return axios.post("/forum/api/login", formData);
}
