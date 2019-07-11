import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getStore, setStore } from '@/utils/store'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  access_token: getStore({ name: 'access_token' }) || '',
  refresh_token: getStore({ name: 'refresh_token' }) || ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ACCESS_TOKEN: (state, access_token) => {
    state.access_token = access_token
    setStore({
      name: 'access_token',
      content: state.access_token,
      type: 'session'
    })
  },
  SET_REFRESH_TOKEN: (state, rfToken) => {
    state.refresh_token = rfToken
    setStore({
      name: 'refresh_token',
      content: state.refresh_token,
      type: 'session'
    })
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, grant_type: 'password', scope: 'server' }).then(response => {
        setToken(response.access_token)
        commit('SET_TOKEN', response.access_token)
        commit('SET_NAME', username)
        commit('SET_ACCESS_TOKEN', response.access_token)
        commit('SET_REFRESH_TOKEN', response.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

