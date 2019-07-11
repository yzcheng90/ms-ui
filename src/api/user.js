import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/oauth/token',
    headers: {
      'Authorization': 'Basic Y2xvdWR4OmNsb3VkeA=='
    },
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
