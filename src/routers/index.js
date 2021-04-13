import { createRouter, createWebHashHistory } from "vue-router";
import { inRouteWhiteList } from "@/utils/tools";
import store from "../store/index";
import Layout from "@/layouts/index.vue";
import adminRoutes from "./admin";
import guestRoutes from "./guest";

const history = createWebHashHistory();

/**
 * @description: 路由
 * hidden： 在导航菜单中隐藏
 */
const mainRoutes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    meta: { title: "主页" },
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    hidden: true,
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/games",
    redirect: "/games/index",
    meta: { title: "游戏" },
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/games/index.vue"),
      },
    ],
  },
  {
    path: "/testApi",
    redirect: "/testApi/index",
    meta: { title: "接口测试" },
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/testApi.vue"),
      },
    ],
  },
  {
    path: "/404",
    hidden: true,
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    hidden: true,
    component: () => import("@/views/404.vue"),
  },
];

export const getRoutes = () => {
  let roleRoutes = {
    Admin: adminRoutes,
    Guest: guestRoutes,
  };
  let role = JSON.parse(localStorage.getItem("role"));
  // 其他的权限路由
  let other = roleRoutes[role] || [];
  let routes = [...mainRoutes, ...other];
  return routes;
};

export const initRouter = () => {
  const routes = getRoutes();
  const router = createRouter({
    history,
    routes,
  });
  return router;
};

export const router = initRouter();

router.beforeEach((to, from, next) => {
  let toPath = to.path;
  if (inRouteWhiteList(toPath)) {
    next();
    return;
  }
  const token = store.state.user.token;
  if (token) {
    next();
  } else {
    // 未登录返回登陆页
    next("/login");
  }
});
