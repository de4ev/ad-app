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
  mutations: {},
  actions: {},
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
