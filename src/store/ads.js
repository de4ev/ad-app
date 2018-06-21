import * as fb from 'firebase'

class Ad {
  constructor (title, description, ownerId, src = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'Description',
        src: 'https://vuetifyjs.com/static/doc-images/carousel/squirrel.jpg',
        promo: false,
        id: '1'
      },
      {
        title: 'Second ad',
        description: 'Description',
        src: 'https://vuetifyjs.com/static/doc-images/carousel/sky.jpg',
        promo: true,
        id: '2'
      },
      {
        title: 'Third ad',
        description: 'Description',
        src: 'https://vuetifyjs.com/static/doc-images/carousel/bird.jpg',
        promo: true,
        id: '3'
      },
      {
        title: 'Last ad',
        description: 'Description',
        src: 'https://vuetifyjs.com/static/doc-images/carousel/planet.jpg',
        promo: true,
        id: '4'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.src,
          payload.promo
        )
        const ad = await fb.database().ref('ads').push(newAd)
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    userAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
