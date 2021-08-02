// 对 http 请求进行封装
import axios from "axios";

// 使用自定义的配置文件发送请求
const instance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'custome-header':'tianliangjiaoyu'
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    instance; // 对响应数据做点什么

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("请求错误");
      console.error(response);
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
