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

// 退出登录
export function logOut() {
  return axios.get("/forum/api/logout");
}

// 忘记密码
export function forgetPassword(loginName, password, phonenumber, code) {
  let formData = new FormData();
  formData.append("loginName", loginName);
  formData.append("password", password);
  formData.append("phonenumber", phonenumber);
  formData.append("code", code);
  return axios.post("/forum/api/password/forget", formData);
}

// 注册
export function register(
  loginName,
  password,
  userName,
  phonenumber,
  code,
  sex,
  remark
) {
  let formData = new FormData();
  formData.append("loginName", loginName);
  formData.append("password", password);
  formData.append("userName", userName);
  formData.append("phonenumber", phonenumber);
  formData.append("code", code);
  formData.append("sex", sex);
  formData.append("remark", remark);
  return axios.post(`/forum/api/registry`, formData);
}

// 获取注册验证码
export function getCode(phonenumber) {
  return axios.get(`/forum/api/short-message/vcode/${phonenumber}`);
}

// 获取登录用户个人信息
export function getUserInfo() {
  return axios.get("/forum/api/login-user/info");
}

// 修改个人信息
export function modifyUserInfo(userName, email, phonenumber, sex, remark) {
  let formData = new FormData();
  formData.append("userName", userName);
  formData.append("email", email);
  formData.append("phonenumber", phonenumber);
  formData.append("sex", sex);
  formData.append("remark", remark);
  return axios.post("/forum/api/system/user/profile/update", formData);
}

// 请求帖子列表
export function getPostList(categoryId = 2, pageNum = 1, pageSize = 20) {
  let formData = new FormData();
  formData.append("categoryId", categoryId);
  formData.append("pageNum", pageNum);
  formData.append("pageSize", pageSize);
  return axios.post("/forum/api/bbs/bbsPosts/open/list", formData);
}
