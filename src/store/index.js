import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverid:'',
  },
  mutations: {
    store_serverid(state,id){
      state.serverid = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
