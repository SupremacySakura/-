<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <!-- 通过:class跟随路由调整颜色 -->
                <el-breadcrumb-item :to="{ path: item.path }" class="text" v-for="item in tagList" :key="item.name" :class="{white:item.name===$route.name}">
                    {{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="../assets/images/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="log-out">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {

  methods: {
    ...mapMutations('tab', ['collapseMenu']),
    handleCommand (command) {
      // 清除token
      if (command === 'log-out') {
        Cookie.remove('token')
        // 清除menu
        Cookie.remove('menu')
        // 修改权限页面
        // 跳转回登录页面
        this.$router.push({ name: 'login' })
      }
    }
  },
  computed: {
    ...mapState('tab', ['tagList'])
  }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color:black;
    height: 60px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .text {
        color: white;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-content {
        cursor: pointer;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        :deep(.el-breadcrumb__item){
            .el-breadcrumb__inner  {
                &.is-link{
                    color: #666;
                    font-size: 14px;
                    margin-left: 10px;
                    font-weight: normal;
                }
            }
            &:last-child{
                .el-breadcrumb__inner{

                    cursor: pointer;
                }
            }
        }
    }
}
.white :first-child{
    color: white !important;
}
</style>
