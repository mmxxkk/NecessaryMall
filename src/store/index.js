import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.token || '',
    user: localStorage.user ? JSON.parse(localStorage.user) : {}
  },
  getters: {
  },
  mutations: {
    setToken(state, val) {
      localStorage.setItem("token", val);
      state.token = val
    },
    setUser(state, obj) {
      localStorage.setItem("user", JSON.stringify(obj));
      state.user = obj
    }
  },
  actions: {
  },
  modules: {
  }
})
