import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
// import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VeLine from 'v-charts/lib/line.common'
// Vue.component(VeLine.name, VeLine)
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(VCharts)
Vue.prototype.$axios = Axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
