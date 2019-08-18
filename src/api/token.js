import request from '@/utils/request'

export function getTokenList(params) {
  return request({
    url: '/auth/token/getTokenList',
    method: 'get',
    params
  })
}
