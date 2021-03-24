import Layout from "@/layouts/index.vue";
const routes = [
  {
    path: "/admin",
    redirect: "/admin/index",
    component: Layout,
    meta: { title: "导航", icon: "el-icon-s-home" },
    children: [
      {
        path: "index",
        component: () => import("@/views/admin/index.vue"),
      },
    ],
  },
];
export default routes;
