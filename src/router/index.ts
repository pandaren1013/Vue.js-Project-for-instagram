import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requireLogin: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/MyProfile.vue"),
    meta: { requireLogin: true }
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { hideNavbar: true }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/Signup.vue"),
    meta: { hideNavbar: true }
  },

  {
    path: "/Error500",
    name: "ServerError",
    component: () => import("@/views/Error500.vue"),
    meta: {
      hideNavbar: true,
      hideFooter: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/Error404.vue"),
    meta: {
      hideNavbar: true,
      hideFooter: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  let _router = to.matched;
  if (to.path === "/login" || to.path === "/signup") {
    if (localStorage.getItem("auth_token")) return next("/");
    return next();
  }
  if (to.meta && !to.meta.requireLogin) {
    return next();
  }
  if (_router.length > 0 && _router.some(route => route.meta.requireLogin)) {
    if (localStorage.getItem("auth_token")) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
