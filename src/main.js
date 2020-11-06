import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import firebase from 'firebase'

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'


import 'bootstrap/scss/bootstrap.scss'
import '@/assets/scss/master.scss'

Vue.use(VueToast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyCPjg1cj62FoCZfhCsXrHLbRd5HNJv3MDs",
      authDomain: "francise-fb70a.firebaseapp.com",
      databaseURL: "https://francise-fb70a.firebaseio.com",
      projectId: "francise-fb70a",
      storageBucket: "francise-fb70a.appspot.com",
      messagingSenderId: "172889616101",
      appId: "1:172889616101:web:55d4db0a6d33d1682dae0c",
      measurementId: "G-9HK8JQZ9HT"
    }

    firebase.initializeApp(firebaseConfig);
    firebase.analytics()
  }
}).$mount('#app')
