import { createRouter, createWebHistory } from 'vue-router'
const routeModules=import.meta.glob('./rouets/*.js', { eager: true })
const routes=Object.keys(routeModules).reduce((v,t)=>{
  if(Array.isArray(routeModules[t].default)){
    v.push(...routeModules[t].default)
  }else{
    v.push(routeModules[t].default)
  }
  return v
},[])
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
