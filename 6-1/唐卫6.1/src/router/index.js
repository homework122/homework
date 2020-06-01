import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/Main",
    name: "Main",
    redirect:'/Home',
    component: () => import("../views/Main.vue"),
    children:[
        {
            path: "/userList",
            name: "userList",
            component: () => import("../views/userList.vue")
        },
        {
            path: "/Home",
            name: "Home",
            component: () => import("../views/Home.vue")
        },
        {
            path: "/productList",
            name: "productList",
            component: () => import("../views/product/productList.vue")
        },
        {
            path: "/productAdd",
            name: "productAdd",
            component: () => import("../views/product/productAdd.vue")
        },
        {
            path: "/productType",
            name: "productType",
            component: () => import("../views/product/productType.vue")
        }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
