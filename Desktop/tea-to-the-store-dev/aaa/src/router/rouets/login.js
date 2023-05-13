export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    redirect: '/login/PhoneLogin',
    children: [
        {
          path: 'UserLogin',
          name: 'UserLogin',
          component: () => import('@/views/login/UserLogin.vue')
        },
        {
          path: 'PhoneLogin',
          name: 'PhoneLogin',
          component: () => import('@/views/login/PhoneLogin.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/views/login/Register.vue')
        }
      ]
  },
];
