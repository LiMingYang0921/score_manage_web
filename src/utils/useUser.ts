import router from '@/router/index'
import request from '@/api/index'
import store from '@/store/index'

export const logout = () => {
  router.push('/login')
  localStorage.removeItem('token')
  store.commit('setUserInfo', {})
  store.commit('setToken', '')
  request.XHRLogout()
}

export const getToken = () => {
  const token = store.state.token
  if (token) {
    return token
  }
  store.commit('setToken', localStorage.token)
  return store.state.token
}
