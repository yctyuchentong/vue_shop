import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'


Vue.use(VueRouter)

const routes = [
  // 当用户访问/时重定向到login
  {path:'/',redirect:'/login'},
  {path:"/login",component:Login},  
  {path:"/home",component:Home}  
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to：将要访问那个路径
  // from：从那个路径跳转而来
  // next：一个函数，代表放行 next()放行   next('/login') 强制跳转到登录页
  if(to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果token为空，则强制跳转到login界面
  if(!tokenStr) return next('/login')
  // 不为空则放行
  next()
})

export default router
