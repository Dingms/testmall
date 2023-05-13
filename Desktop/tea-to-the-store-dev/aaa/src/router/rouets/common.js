export default [
  {
    path: "/",
    redirect: "/tea",
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: () => import("@/views/notfound/index.vue"),
    meta: {
      title: "404页面",
    },
  },
];
