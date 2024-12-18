import axios from 'axios'
const request = axios.create({
  baseURL: '/ftyyptapi',
  timeout: 3000,
})
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
request.interceptors.response.use((response) => {
  return response
})
export default request
