import Cookie from 'js-cookie'
export default {
  namespaced: true,
  state: {
    isCollapse: false, // 控制菜单的展开或收起
    tagList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    menu: [],
    canGoName: [],
    childrenCanGo: []
  },
  getters: {
  },
  mutations: {
    // 修改菜单展开收起的方法
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    // 添加tag的方法
    changeTagList (state, newList) {
      const isExist = state.tagList.some(item => item.name === newList.name)
      if (!isExist) {
        state.tagList.push(newList)
      }
    },
    // 关闭tag的方法
    closeTagList (state, index) {
      state.tagList.splice(index, 1)
    },
    // 存储menu
    getMenu (state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
      console.log(state.menu)
      // 判断menu是否有children
      val.forEach(element => {
        if (element.children) {
          state.childrenCanGo = element.children.map((item) => {
            return item.name
          })
        }
      })
      state.canGoName = val.map((item) => {
        return item.name
      })
      state.canGoName.push(...state.childrenCanGo)
      console.log(state.canGoName, 'name')
      Cookie.set('canGoName', JSON.stringify(state.canGoName))
    }
  },
  actions: {
  }
}
