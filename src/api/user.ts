import request from '@/utils/request'
import type {
  loginType,
  apiType,
  loginData,
  userListType,
  userRes,
  userAddType,
} from '@/types/user'
export const loginApi = (data: loginType) => {
  return request<apiType<loginData[]>>({
    method: 'post',
    url: '/user/login',
    data,
  })
}
export const userListApi = (params: userListType) => {
  return request<apiType<userRes[]>>({
    method: 'get',
    url: '/user/index',
    params,
  })
}
export const userAddApi = (data: userAddType) => {
  return request({
    method: 'post',
    url: '/user/create',
    data,
  })
}
export const delUserApi = (params: userRes) => {
  return request({
    method: 'delete',
    url: '/user/delete',
    params,
  })
}
