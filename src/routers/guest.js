import Layout from "@/layouts/index.vue";
const routes = [
  {
    path: "/guest",
    redirect: "/guest/index",
    component: Layout,
    meta: { title: "Guest" },
    children: [
      {
        path: "index",
        component: () => import("@/views/guest/index.vue"),
      },
    ],
  },
];
export default routes;
