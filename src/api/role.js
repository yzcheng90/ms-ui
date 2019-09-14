import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/auth/role/list',
    method: 'get',
    params
  })
}
