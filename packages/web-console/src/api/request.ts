import axios from 'axios';
import { ElNotification } from 'element-plus';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN
})

request.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('book.token')
  return config
})

request.interceptors.response.use((res) => {
  if (!res.data.success && res.data.msg) {
    ElNotification.warning({
      title: res.data.msg
    })
  }
  return res
}, (e) => {
  if (e.response?.status === 401) {
    ElNotification.warning({
      title: '请登录'
    })
  }
  return e.response
})

export default request;