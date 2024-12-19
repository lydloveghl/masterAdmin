import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'
const request = axios.create({
  baseURL: '/ftyyptapi',
  timeout: 3000,
})
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
request.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      ElMessage.error(response.data.msg)
      return Promise.reject(response.data)
    } else {
      router.push('/index')
      return response
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default request
