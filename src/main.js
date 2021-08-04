import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Vant
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
// Ant-Design
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
Vue.use(Antd);
// img
import { Image as VanImage } from "vant";
Vue.use(VanImage);
// lozyload
import { Lazyload } from "vant";
Vue.use(Lazyload);
// Dialog
import { Dialog } from "vant";
Vue.use(Dialog);
// ImagePreview
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
// form
import { Form } from "vant";
import { Field } from "vant";
Vue.use(Form);
Vue.use(Field);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
