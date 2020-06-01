import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes= [
    {
        path: '/',   //链接路径
        name: 'login',  //路由名称
        component: () => import('../views/login.vue'),  //映射的组件
    },
    {
        path: '/home',   //链接路径
        name: 'home',  //路由名称
        component: () =>import('../views/home.vue') ,  //映射的组件
        redirect:'/home/index',
        children:[
            {
            path: '/home/index',   //链接路径
            name: 'index',  //路由名称
            component: () => import('../views/index.vue'),  //映射的组件
            },
            {
                path: '/home/user',
                name: 'user',
                component: () => import('../views/users.vue'),
            },
            {
                path: '/home/brand',
                name: 'brand',
                component: () => import('../views/brand.vue'),
            },
            {
                path: '/home/product',
                name: 'product',
                component: () => import('../views/product'),
            },
            {
                path: '/home/addGoods',
                name: 'product',
                component: () => import('../views/addGoods'),
            },
            {
                path: '/home/category',
                name: 'product',
                component: () => import('../views/category'),
            },
        ]
    },


]


export default new Router({
    mode:  'history',
    routes,


})