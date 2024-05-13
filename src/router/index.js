import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/TheHome.vue'
import User from '@/views/TheUser.vue'
import Main from '@/views/TheMain.vue'
import Mall from '@/views/TheMall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'
import Login from '@/views/TheLogin.vue'
// 1.创建路由组件
Vue.use(VueRouter)
// 2.将路由与组件进行映射
const routes = [
  // 主路由
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      // 子路由
      { path: 'home', name: 'home', component: Home }, // 首页
      { path: 'user', name: 'user', component: User }, // 用户管理
      { path: 'mall', name: 'mall', component: Mall }, // 商品管理
      { path: 'page1', name: 'page1', component: PageOne }, // 页面一
      { path: 'page2', name: 'page2', component: PageTwo } // 页面二
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]
// 3.创建router实例
const router = new VueRouter({
  routes
})
// 3.将router实例对外暴露
export default router

// 解决重复跳转报错问题
// router/index.js
// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  // 第一个形参：路由跳转的配置对象（query|params）
  // 第二个参数：undefined|箭头函数（成功的回调）
  // 第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    // push方法传递第二个参数|第三个参数（箭头函数）
    // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
// 重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
