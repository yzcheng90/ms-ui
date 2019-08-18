import request from '@/utils/request'

export function getClientList(params) {
  return request({
    url: '/auth/token/getClientList',
    method: 'get',
    params
  })
}
