import Layout from "@/layouts/index.vue";
const routes = [
  {
    path: "/guest",
    redirect: "/guest/index",
    component: Layout,
    meta: { title: "导航", icon: "el-icon-s-home" },
    children: [
      {
        path: "index",
        component: () => import("@/views/guest/index.vue"),
      },
    ],
  },
];
export default routes;
