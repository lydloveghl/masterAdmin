import request from '@/utils/request'
import type { getAuthListRes } from '@/types/auth'
export const getAuthListApi = () => {
  return request<getAuthListRes>({
    method: 'get',
    url: '/auth/index',
  })
}
