import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import indexs from '../views/indexs.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/chaidan',
    name: 'chaidan',
    component: () => import(/* webpackChunkName: "about" */ '../views/chaidan.vue'),
    children: [
      {
        path: '/',
        name: 'indexs',
        component: indexs
      },
      {
        path: '/dingdan',
        name: 'dingdan',
        component: () => import(/* webpackChunkName: "about" */ '../views/dingdan.vue')
      },
      {
        path: '/guanliyuan',
        name: 'guanliyuan',
        component: () => import(/* webpackChunkName: "about" */ '../views/guanliyuan.vue')
      },
      {
        path: '/huiyuan',
        name: 'huiyuan',
        component: () => import(/* webpackChunkName: "about" */ '../views/huiyuan.vue')
      },
      {
        path: '/tianjia',
        name: 'tianjia',
        component: () => import(/* webpackChunkName: "about" */ '../views/tianjia.vue')
      },
      {
        path: '/shangpinliebiao',
        name: 'shangpinliebiao',
        component: () => import(/* webpackChunkName: "about" */ '../views/shangpinliebiao.vue')
      },
      {
        path: '/pinpai',
        name: 'pinpai',
        component: () => import(/* webpackChunkName: "about" */ '../views/pinpai.vue')
      },
      {
        path: '/fenlie',
        name: 'fenlie',
        component: () => import(/* webpackChunkName: "about" */ '../views/fenlie.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
