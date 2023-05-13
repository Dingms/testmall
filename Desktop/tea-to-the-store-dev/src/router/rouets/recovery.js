export default [
  {
    path: "/recovery",
    name: "recovery",
    component: () => import("@/views/recovery/index.vue"),
    redirect: "/recovery/index",
    children: [
      {
        path: "index",
        name: "RecoveryIndex",
        component: () => import("@/views/recovery/RecoveryIndex.vue"),
      },
      {
        path: "btn",
        name: "RecoveryBtn",
        component: () => import("@/views/recovery/RecoveryBtn.vue"),
      },
    ],
  },
];
