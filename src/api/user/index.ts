import request from '@/utils/request'
export const getUserList = () => {
  return request({
    method: 'get',
    url: '/user/index',
  })
}
