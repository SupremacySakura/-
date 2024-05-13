import axios from 'axios'

const http = axios.create({
  // 请求通用的地址前缀
  baseURL: '/api',
  timeout: 10000// 超时时间,单位为毫秒
})

// Add a request interceptor 添加请求拦截器
http.interceptors.request.use(function (config) {
  // Do something before request is sent 在发送请求之前做些什么

  return config
}, function (error) {
  // Do something with request error 对请求错误做些什么

  return Promise.reject(error)
})

// Add a response interceptor 添加响应拦截器
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data 对响应数据做些什么

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error 对响应错误做些什么

  return Promise.reject(error)
})

export default http
