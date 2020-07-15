import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  // baseURL:'http://localhost:4400/admin/api'
  baseURL:'http://localhost:4400/admin/api/rest/'
})

// 请求拦截器
http.interceptors.request.use( config => {
  // 在发送请求之前做些什么
  if(localStorage.token){
    config.headers.Authorization = "Bearer " + (localStorage.getItem('token') || '')
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  if(err.response.data.message){
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    console.log(err.response)
    if(err.response.status === 401){
      router.push('/login')
    }
  }
  return Promise.reject(err) 
})

export default http 