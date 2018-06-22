import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCXAt7sYjrCD-okksPVEOuDcEsCIjbhk20',
      authDomain: 'dechev-ad-app.firebaseapp.com',
      databaseURL: 'https://dechev-ad-app.firebaseio.com',
      projectId: 'dechev-ad-app',
      storageBucket: 'dechev-ad-app.appspot.com',
      messagingSenderId: '506658506283'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
