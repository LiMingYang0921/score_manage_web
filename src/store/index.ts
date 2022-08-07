import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    userInfo: {},
    menuIsCollapse: false
  },
  getters: {
    menuIsCollapse (state) {
      if (state.menuIsCollapse) {
        return state.menuIsCollapse
      }
      setTimeout(() => {
        return state.menuIsCollapse
      }, 1000)
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.token = token
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setMenuIsCollapse (state) {
      state.menuIsCollapse = !state.menuIsCollapse
    }
  },
  actions: {
  },
  modules: {
  }
})
