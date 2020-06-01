import Vue from "vue";
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import App from "./App.vue";



Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
