// vue.config.js for less-loader@6.0.0
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            "primary-color": "#4d698e",
            "link-color": "#4d698e",
            "border-radius-base": "2px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
