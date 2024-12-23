import request from '@/utils/request'
import type { roleListRes, roleCreateRes } from '@/types/user'
export function getRoleList(params: any) {
  return request<roleListRes>({
    method: 'get',
    url: '/role/index',
    params,
  })
}
export function addRoleApi(data: any) {
  return request<roleCreateRes>({
    method: 'post',
    url: '/role/create',
    data,
  })
}
export function deleteRoleApi(params: any) {
  return request({
    method: 'delete',
    url: '/role/delete',
    params,
  })
}
export function updateRoleApi(data: any) {
  return request({
    method: 'put',
    url: '/role/update',
    data,
  })
}
