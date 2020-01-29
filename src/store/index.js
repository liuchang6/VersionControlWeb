import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerName: null,
    token: null,
    user: null
  },
  mutations: {
    isLogin(state, value) {
      state.token = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setRouterName(state, value) {
      state.routerName = value
    }
  },
  actions: {
  },
  modules: {
  }
})
