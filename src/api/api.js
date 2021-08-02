import axios from "./http";

// 单独管理接口

// 获取专题列表
export function getTopicsList() {
  return axios.post("/forum/api/bbs/bbsCategory/open/list");
}
