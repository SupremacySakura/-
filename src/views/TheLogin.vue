<template>
    <div>
        <el-form :model="form" :rules="rules" class="login-container" ref="form">
            <h3>系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import { getMenu } from '@/API/index'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    submit () {
      // 校验通过发送请求
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 发送请求获取token
          getMenu(this.form).then((data) => {
            console.log(data)
            if (data.data.code === 20000) {
              const token = data.data.data.token
              // token信息储存
              Cookie.set('token', token)
              // menu菜单的储存
              const menu = data.data.data.menu
              this.$store.commit('tab/getMenu', menu)
              console.log(menu, 'menu')
              // 跳转到首页
              this.$router.push({ name: 'home' })
            } else {
              this.$message.error(data.data.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow:  0 0 25px #cac6c6;
}
</style>
