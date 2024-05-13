import Vue from 'vue'
import App from './App.vue'
// 将router挂载到根实例
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/API/mock'
import Cookie from 'js-cookie'
Vue.config.productionTip = false
Vue.use(ElementUI)

// 添加全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 判断token存不存在
  const token = Cookie.get('token')
  // 导入权限页面
  let canGoName = []
  if (!Cookie.get('canGoName')) {
    canGoName = store.state.tab.canGoName
  } else {
    canGoName = JSON.parse(Cookie.get('canGoName'))
  }
  canGoName.push('login')
  // 如果token不存在,说明当前用户是未登录状态,应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else if (canGoName.some(e => e === to.name)) {
    next()
  } else {
    next({ name: 'home' })
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
