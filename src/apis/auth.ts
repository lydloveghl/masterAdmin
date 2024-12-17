import request from '@/utils/request'
export function userLoginCheck(token: string) {
  return request.get('/auth/menu', { params: { token } })
}
