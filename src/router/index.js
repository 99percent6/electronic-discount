import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Stores from '@/pages/Stores'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stores/:slug',
      name: 'Stores',
      component: Stores
    }
  ]
})
