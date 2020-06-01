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
            path: "/UserList",
            name: "UserList",
            component: () => import("../views/UserList.vue")
        },
        {
            path: "/Home",
            name: "Home",
            component: () => import("../views/Home.vue")
        },
        {
            path: "/brandList",
            name: "brandList",
            component: () => import("../views/brandList.vue")
        },
        {
            path: "/addBrand",
            name: "addBrand",
            component: () => import("../views/addBrand.vue"),

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
