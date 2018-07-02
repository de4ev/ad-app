import * as fb from 'firebase'

class Order {
  constructor (name, phone, message, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.message = message
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, message, adId, ownerId }) {
      const order = new Order(name, phone, message, adId)
      commit('clearError')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)
      const resultOrders = []

      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        if (orders !== null) {
          Object.keys(orders).forEach(key => {
            const order = orders[key]
            resultOrders.push(
              new Order(order.name, order.phone, order.message, order.adId, order.done, key)
            )
          })
        }
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async markOrderDone ({commit, getters}, id) {
      commit('clearError')
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(id).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
