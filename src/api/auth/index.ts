import request from '@/utils/request'
import type { addAuthResType, getAuthListRes } from '@/types/auth'
export const getAuthListApi = () => {
  return request<getAuthListRes>({
    method: 'get',
    url: '/auth/index',
  })
}
export const addAuthApi = (data: any) => {
  return request<addAuthResType>({
    method: 'post',
    url: '/auth/create',
    data,
  })
}
export const delAuthApi = (params: any) => {
  return request({
    method: 'delete',
    url: '/auth/delete',
    params,
  })
}
export const getAuthMenuApi = () => {
  return request({
    method: 'get',
    url: '/auth/menu',
  })
}
