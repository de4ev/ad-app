import * as fb from 'firebase'

class Ad {
  constructor (title, description, ownerId, imgName = '', src = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imgName = imgName
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, ad) {
      state.ads.push(
        new Ad(
          ad.title,
          ad.description,
          ad.ownerId,
          ad.imgName,
          ad.src,
          ad.promo,
          ad.id
      ))
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('clearMessage')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          '',
          payload.promo
        )
        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const imgName = `${ad.key}${imageExt}`
        await fb.storage().ref(`ads/${imgName}`).put(image)
        const src = await fb.storage().ref(`ads/${imgName}`).getDownloadURL()
          .then(function (url) {
            return url
          })
        await fb.database().ref('ads').child(ad.key).update({
          src,
          imgName
        })
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imgName,
          src
        })
        commit('setMessage', 'New ad created')
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultAds = []
      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imgName,
              ad.src,
              ad.promo,
              key
          ))
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('clearMessage')
      commit('setLoading', true)
      try {
        await fb.database().ref('ads').child(id).update({
          title, description
        })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
        commit('setMessage', 'Ad updated')
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async deleteAd ({commit}, {ad}) {
      commit('clearError')
      commit('clearMessage')
      commit('setLoading', true)
      try {
        await fb.database().ref('ads').child(ad.id).remove()
        await fb.storage().ref('ads').child(`${ad.imgName}`).delete()
        commit('setLoading', false)
        commit('setMessage', 'Ad deleted')
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
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
    userAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
