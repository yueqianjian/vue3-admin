import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layouts/index.vue";

const history = createWebHashHistory();

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    meta: { title: "导航", icon: "el-icon-s-home" },
    children: [
      {
        path: "home",
        component: () => import("@/views/home.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/testApi",
    component: () => import("@/views/testApi.vue"),
  },
  {
    path: "/sudoku",
    redirect: "/sudoku/index",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/sudoku/index.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "el-icon-user-solid",
    },
    redirect: "/users/list",
    children: [
      {
        path: "list",
        component: () => import("@/views/users/list.vue"),
        meta: {
          title: "用户列表",
          icon: "el-icon-document",
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
  },
];
const router = createRouter({
  history,
  routes,
});

export default router;
