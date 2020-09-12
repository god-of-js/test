import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import auth from "@/router/auth";
import app from "@/router/app";
import resetpassword from "@/views/auth/resetpassword.vue";
import verifications from "@/views/auth/verifications.vue";
Vue.use(VueRouter);

const routes = [
  ...auth,
  ...app,
  { path: "/drivers-*" },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/reset-password",
    name: "resetpassword",
    component: resetpassword
  },
  {
    path: "/verification",
    name: "verifications",
    component: verifications
  },
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
