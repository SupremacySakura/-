<template>
  <div>
    <!-- 跟随路由变化选中需要改变default-active -->
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

      <h3>{{ isCollapse ? '后台' :'通用后台管理系统'}}</h3>
      <!-- 单层 -->
      <el-menu-item :index="item.name" v-for="item in noChildren" :key="item.name" @click="clickMenu(item)">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 多层 -->
      <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.label">
          <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-weight: 400;
    font-size: 16px;
  };
}
</style>

<script>
// 引入辅助函数
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 点击菜单跳转
    clickMenu (item) {
      this.$router.push(item.path)
      // 点击添加面包屑
      this.$store.commit('tab/changeTagList', item)
    }

  },
  computed: {
    // 没有子菜单
    noChildren () {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren () {
      return this.menuData.filter(item => item.children)
    },
    // 获取仓库数据
    ...mapState('tab', ['isCollapse']),
    menuData () {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }
  }
}
</script>
