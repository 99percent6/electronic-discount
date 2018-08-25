// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import { EventBusPlugin as EventBus } from './event-bus'
// import VueFire from 'vuefire'
// import firebase from 'firebase/app'
// import 'firebase/database'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  attempt: 2
})
Vue.use(EventBus)
// Vue.use(VueFire)
// const firebaseApp = firebase.initializeApp({
//   projectId: 'electronic-discounter',
//   databaseURL: 'https://electronic-discounter.firebaseio.com'
// })
// export const database = firebaseApp.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
