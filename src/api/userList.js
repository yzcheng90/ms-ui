import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/admin/user/getList',
    method: 'get',
    params
  })
}
