import router from '@/router';
import axios from 'axios';
import { ElNotification } from 'element-plus';
import { get } from 'lodash';

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
    localStorage.removeItem('book.token')
    router.replace('/login')
  } else {
    const status = get(e, 'response.status', '未知错误')
    const msg = get(e, 'response.data.msg', e.toString())
    ElNotification.error({
      title: status,
      message: msg
    })
  }
  return e.response
})

export default request;