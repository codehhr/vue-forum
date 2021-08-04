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
// img
import { Image as VanImage } from "vant";
Vue.use(VanImage);
// lozyload
import { Lazyload } from "vant";
Vue.use(Lazyload);
// Dialog
import { Dialog } from "vant";
Vue.use(Dialog);

Vue.use(Vant);
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
