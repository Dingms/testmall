export default {
  path: "/tea",
  name: "tea",
  redirect: "/tea/recommend",
  component: () => import("@/views/home/index.vue"),
  children: [
    {
      path: "recommend",
      name: "recommend",
      component: () => import("@/views/recommend/index.vue"),
    },
    {
      path: "JinjunmeiBlackTea",
      name: "JinjunmeiBlackTea",
      component: () => import("@/views/JinjunmeiBlackTea/index.vue"),
    }, {
      path: "clovershrub",
      name: "clovershrub",
      component: () => import("@/views/clovershrub/index.vue"),
    },{
      path: "TieGuanyin",
      name: "TieGuanyin",
      component: () => import("@/views/TieGuanyin/index.vue"),
    },
    
  ],
};
