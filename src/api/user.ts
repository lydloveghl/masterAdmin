import request from '@/utils/request'
import type { loginType, apiType, loginData } from '@/types/user'
export const loginApi = (data: loginType) => {
  return request<apiType<loginData>>({
    method: 'post',
    url: '/user/login',
    data,
  })
}
