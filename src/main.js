import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Vant
import Vant from "vant";
import "vant/lib/index.css";
// Ant-Design
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

Vue.use(Vant);
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
