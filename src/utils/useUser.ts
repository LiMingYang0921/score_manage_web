import router from '@/router/index'
import request from '@/api/index'
import store from '@/store/index'

export const logout = () => {
  router.push('/login')
  localStorage.removeItem('token')
  store.commit('setUserInfo', {})
  request.XHRLogout()
}
