import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Stores from '@/pages/Stores'
import Search from '@/pages/Search'

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
    },
    {
      path: '/stores/:slug/page/:page',
      name: 'Stores-page',
      component: Stores
    },
    {
      path: '/search/:searchText',
      name: 'Search',
      component: Search
    },
    {
      path: '/search/:searchText/page/:page',
      name: 'Search-page',
      component: Search
    }
  ]
})
