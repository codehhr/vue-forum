import axios from "./http";

// 单独管理接口

// 获取专题列表
export function getTopicsList() {
  return axios.post("/forum/api/bbs/bbsCategory/open/list");
}

// 登录
export function login({ username, password }) {
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

/*
  忘记密码
  // userName:昵称; password:密码; phonenumber:手机号; code:验证码
*/
export function forgetPassword({ loginName, password, phonenumber, code }) {
  let formData = new FormData();
  formData.append("loginName", loginName);
  formData.append("password", password);
  formData.append("phonenumber", phonenumber);
  formData.append("code", code);
  return axios.post("/forum/api/password/forget", formData);
}

/*
  注册
  // loginName 登录名称; password:密码; userName:昵称; phonenumber:手机号; code:验证码; sex:性别; remark:个性签名
*/
export function register({
  loginName,
  password,
  userName,
  phonenumber,
  code,
  sex,
  remark,
}) {
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

/*
  修改个人信息
  // userName:昵称; email:邮箱; phonenumber:手机号; sex:性别; remark:个性签名
*/
export function modifyUserInfo({ userName, email, phonenumber, sex, remark }) {
  let formData = new FormData();
  formData.append("userName", userName);
  formData.append("email", email);
  formData.append("phonenumber", phonenumber);
  formData.append("sex", sex);
  formData.append("remark", remark);
  return axios.post("/forum/api/system/user/profile/update", formData);
}

/*
  请求帖子列表
*/
export function getPostList({
  categoryId,
  title = "",
  pageNum = 1,
  pageSize = 20,
}) {
  let formData = new FormData();
  formData.append("categoryId", categoryId);
  formData.append("title", title);
  formData.append("pageNum", pageNum);
  formData.append("pageSize", pageSize);
  return axios.post("/forum/api/bbs/bbsPosts/open/list", formData);
}

// 获取帖子详情
export function getPostDetail(postsId) {
  return axios.get(`/forum/api/bbs/bbsPosts/open/detail/${postsId}`);
}

/* 
  创建帖子
  // 分类 Id ,类型(可选) ,标题 ,子标题(可选) , 描述 ,副文本(可选) ,封面
*/
export function newPost({ categoryId, title, subTitle, intro, coverImgUrl }) {
  let formData = new FormData();
  formData.append("categoryId", categoryId);
  formData.append("title", title);
  formData.append("subTitle", subTitle);
  formData.append("intro", intro);
  formData.append("coverImgUrl", coverImgUrl);
  return axios.post("/forum/api/bbs/bbsPosts/site/add", formData);
}

/*
  上传图片
  // file:文件类型; fileUseForEnum:上传图片用于什么地方,可选参数（BBS/DEFAULT/RICH_TEXT/AVATAR/CMS/SHOP/BBS）
*/
export function uploadImg({ file, fileUseForEnum }) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("fileUseForEnum", fileUseForEnum);
  return axios.post("/forum/api/nos/upload/image", formData);
}

/*
  评论列表
  // postsId:帖子 Id; pageNum:页码 (可选); pageSize:每页个数 (可选)
*/
export function getCommentsList(postsId, pageNum = 1, pageSize = 10) {
  let formData = new FormData();
  formData.append("postsId", postsId);
  formData.append("pageNum", pageNum);
  formData.append("pageSize", pageSize);

  return axios.post("/forum/api/bbs/bbsComment/open/list", formData);
}
