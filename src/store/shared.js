export default {
  state: {
    loading: false,
    error: false,
    message: ''
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = ''
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    setMessage ({commit}, payload) {
      commit('setMessage', payload)
    },
    clearMessage ({commit}) {
      commit('clearMessage')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    message (state) {
      return state.message
    }
  }
}
