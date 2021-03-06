module.exports = {
  devServer: {
    open: true,
    // 配置代理
    proxy: {
      "/forum": {
        target: "https://showme2.myhope365.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/forum": "",
        },
      },
    },
  },
  // 配置 Vant 主题
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#4d698e",
            "border-color": "#4d698e",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
            "primary-color": "#4d698e", // 全局主色
            "link-color": "#4d698e", // 链接色
            "border-radius-base": "2px", // 组件/浮层圆角
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
