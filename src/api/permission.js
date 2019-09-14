import request from '@/utils/request'

export function getPermissionList(params) {
  return request({
    url: '/auth/permission/list',
    method: 'get',
    params
  })
}
