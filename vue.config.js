module.exports = {
  devServer: {
    open: true,
    // 配置代理
    proxy: {
      "/api": {
        target: "https://showme2.myhope365.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
