<template>
  <div>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8" style="padding-right: 10px">
        <!-- 上 -->
        <div class="">
          <el-card class="box-card">
            <div class="user">
              <img src="@/assets/images/user.png" alt="">
              <div class="user-info">
                <p class="user-name">Admin</p>
                <p class="user-power">超级管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间:<span>2021-7-19</span></p>
              <p>上次登录地点:<span>成都</span></p>
            </div>
          </el-card>
          <!-- 下 -->
          <el-card class="box-card" style="margin-top: 20px;height: 460px;">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column :prop="key" :label="value" width="auto" v-for="(value,key) in tableDataChange"
                :key="key"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
          <el-card class="box-card" v-for="item in countData" :key="item.name"
            :body-style="{display:'flex', padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">${{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px;" id="home_echarts1">
        </el-card>
        <!-- 图表 -->
        <div class="graph">
          <el-card style="height: 260px;" id="home_echarts2"></el-card>
          <el-card style="height: 260px;" id="home_echarts3"></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '@/API/index'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
      tableDataChange: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      orderData: [],
      userData: [],
      videoData: []
    }
  },
  mounted () {
    // 发送请求获取图表数据
    getData().then((data) => {
      console.log(data.data.data)
      // 解构保存数据
      const { tableData, orderData, userData, videoData } = data.data.data
      this.tableData = tableData
      this.orderData = orderData
      this.userData = userData
      this.videoData = videoData
      // 折线图
      // 基于准备好的dom,初始化echarts实例
      const homeEcharts1 = document.getElementById('home_echarts1')
      const echarts1 = echarts.init(homeEcharts1)
      // 指定图表的配置项和数据
      const echarts1option = {
        xAxis: {},
        yAxis: {},
        series: [], // 注意series是一个数组
        legend: {}
      }
      // 处理xAxis
      echarts1option.xAxis = {
        data: orderData.date
      }
      // 处理yAxis
      echarts1option.yAxis = {}
      // 处理legend
      const legend = Object.keys(orderData.data[0])
      echarts1option.legend = {
        data: legend
      }
      // 处理series
      // 通过xAxis的键值对遍历
      legend.forEach(key => {
        echarts1option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      // 注入实例
      echarts1.setOption(echarts1option)

      // 柱状图
      const homeEcharts2 = document.getElementById('home_echarts2')
      const echarts2 = echarts.init(homeEcharts2)
      // 指定图表的配置项和数据
      const echarts2option = {
        xAxis: {},
        yAxis: {},
        series: [], // 注意series是一个数组
        legend: {}
      }
      // 处理xAxis
      const userDataDate = this.userData.map((item) => item.date)
      echarts2option.xAxis = {
        data: userDataDate
      }
      // 处理yAxis
      echarts2option.yAxis = {}
      // 处理legend
      echarts2option.legend = {}
      // 处理series
      const userDataActive = this.userData.map((item) => item.active)
      const userDataNew = this.userData.map((item) => item.new)
      echarts2option.series.push({
        name: '',
        type: 'bar',
        data: userDataActive
      })
      echarts2option.series.push({
        name: '',
        type: 'bar',
        data: userDataNew
      })
      // 注入实例
      echarts2.setOption(echarts2option)

      // 饼状图
      const homeEcharts3 = document.getElementById('home_echarts3')
      const echarts3 = echarts.init(homeEcharts3)
      // 指定图表的配置项和数据
      const echarts3option = {
        series: [], // 注意series是一个数组
        legend: {}
      }
      // 处理legend
      echarts3option.legend = {
        orient: 'vertical',
        left: 'left'
      }
      // 处理series
      echarts3option.series.push(
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: videoData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }

      )
      // 处理tooltip
      echarts3option.tooltip = {
        trigger: 'item'
      }
      // 注入实例
      echarts3.setOption(echarts3option)
    })
  }
}
</script>

<style lang="less" scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info{
    margin-left: 40px;
    .user-name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .user-power{
      color: #999999;
    }
  }
}
.login-info {
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color:#fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      text-align: center;
      color: #999999;
    }
    margin-left: 15px;
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph{
  margin-top: 20px ;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
}
</style>
