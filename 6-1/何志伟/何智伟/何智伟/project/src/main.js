import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Resource from 'vue-resource'

import router from './router'


// axios


Vue.prototype.$axios = axios


Vue.use(Resource)


Vue.use(ElementUI)//全局使用ElementUI

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
