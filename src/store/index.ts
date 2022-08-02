import { createStore } from 'vuex'

export default createStore({
  state: {
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
