import request from '@/utils/request'
import type { loginType } from '@/types/user'
export const loginApi = (data: loginType) => {
  return request({
    method: 'post',
    url: '/user/login',
    data,
  })
}
