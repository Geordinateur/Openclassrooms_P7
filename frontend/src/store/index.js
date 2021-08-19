import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  auth: false,
  user: {
  },
  likes: {
  },
}

//const mutations = {
//  LOGIN: (state, name) => {
//    state.user.push({
//      name: name,
//      completed: false
//    })
//  }
//}

export default new Vuex.Store({
  state: state,  
  mutations: {
    AUTHENTIFICATION(state, payload) {
      state.auth = true
      state.user.name = payload.username
      state.user.id = payload.id
      state.user.imageUrl = payload.imageUrl
      if(parseInt(payload.isAdmin) === 1) {state.user.isAdmin = true}
    },
  },
  getters: {
    userSaw(state) {
      return `${state.name}`
    }
  },
  actions: {
  },
  modules: {
  },
})
