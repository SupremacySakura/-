import Mock from 'mockjs'
import homeApi from '@/API/mockServeData/home'
import user from '@/API/mockServeData/user'
import permission from '@/API/mockServeData/permission'
// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

// 权限
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)
