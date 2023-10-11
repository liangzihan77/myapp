// 创建路由
import { createRouter, createWebHashHistory } from 'vue-router'
import Mainbox from '../views/Mainbox.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/notfound/NotFound.vue'
import RoutesConfig from './config'
import { useRouterStore } from '../store/useRouterStore'
// 两个大的路由组件（像两个页面一样）
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: Mainbox
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
// 路由拦截
// 从login开始！授权了才能跳转其他的页面
router.beforeEach((to, from, next) => {
  // 路由拦截的时候用pinia
  const { isGetterRouter } = useRouterStore()
  if (to.name === "login") {
    next()
  } else {
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      // 动态配置路由
      if (!isGetterRouter) {
        // 初始值是false加！变为true走这条
        ConfigRouter()
        // 刚配置完下一次才能生效，所以让next跳转两次我们要去的路由
        next({
          path: to.fullPath
        })
      } else {
        next()
      }

    }
  }

})
// 对RoutesConfig这个数组做一个循环
const ConfigRouter = () => {
  // 跳转第二次时值变为true直接放行
  const { changeRouter } = useRouterStore()
  RoutesConfig.forEach(item => {
    // console.log(item)
    // 把config里面的路由加在mainbox里面
    router.addRoute("mainbox", item)
  })
  // 加重定向
  router.addRoute("mainbox", {
    path: "/",
    redirect: "/index"
  })
  // 404匹配
  router.addRoute("mainbox", {
    // 没有匹配到的话到404
    path: "/:pathMatch(.*)*",
    name: "not found",
    component: NotFound
  })
  // 改变状态true
  changeRouter(true)
}
export default router