import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  console.log('----------获取token---------')
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('----------保存token---------')
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
