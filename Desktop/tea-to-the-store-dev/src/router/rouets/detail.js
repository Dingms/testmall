export default [
  {
    path:"/detail/:id",
    props: route => ({ id: route.params.id ? +route.params.id : 0 }),
    name:"detail",
    component:()=>import("@/views/detail/index.vue")
  }
  ];
  