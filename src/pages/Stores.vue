<template>
  <div id="stores" class="content-container">
    <div class="col-xs-12 flex start-xs middle-xs">
      <h2>Товары со скидками {{ store }}</h2>
    </div>
    <div class="col-xs-12 filters">
      <div class="filter-title flex middle-xs">
        <h3 @click="hide = !hide" class="pointer">Фильтры</h3>
        <span class="pointer" :class="hide ? 'arrow-up' : ''">&#8250;</span>
      </div>
      <div class="all-filters flex flex-wrap" :class="hide ? 'hide' : ''">
        <div v-if="$route.params.slug === 'all'" class="store-filter col-xs-12 col-md-2">
          <div class="name">
            Магазин
          </div>
          <div class="store-list">
            <div class="" v-for="(store, index) in storeList" :key="index">
              <input type="radio" :name="store.name" value=""
                :checked="selectedStore === store.name" @click="selectStore(store.name)">
              <label :class="selectedStore === store.name ? 'active-input' : ''" :for="store.name" @click="selectStore(store.name)">{{ store.title }}</label>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-2">
          <price-filter :max-price="maxPrice"/>
        </div>
      </div>
    </div>
    <div class="product-listing flex between-xs flex-wrap">
      <div class="" v-for="(product, index) in items" :key="index">
        <product-tile :product="product" />
      </div>
    </div>
    <pagination />
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
// import EldoradoItems from '../../stores/data/eldorado.json'
// import MvideoItems from '../../stores/data/mvideo.json'
import Pagination from '../components/Pagination.vue'
import PriceFilter from '../components/Stores/Filters/Price.vue'
// import { database } from '../main.js'
import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(VueFire)
const firebaseApp = firebase.initializeApp({
  projectId: 'electronic-discounter',
  databaseURL: 'https://electronic-discounter.firebaseio.com'
})
const database = firebaseApp.database()

export default {
  data () {
    return {
      items: [],
      rootItems: [],
      store: '',
      storeList: [
        {
          title: 'Эльдорадо',
          name: 'eldorado'
        },
        {
          title: 'Мвидео',
          name: 'mvideo'
        }
      ],
      selectedStore: '',
      hide: false,
      pagination: {
        perPage: 20
      },
      countProducts: 0
    }
  },
  firebase: {
    dbItems: {
      source: database.ref('/items'),
      dbItems: true,
      readyCallback: function () {
        let slug = this.$route.params.slug
        if (slug) {
          if (slug === 'eldorado') {
            this.itemsHandle(this.dbItems.filter((e) => e.store === 'Eldorado'), 'в Эльдорадо')
          } else if (slug === 'mvideo') {
            this.itemsHandle(this.dbItems.filter((e) => e.store === 'Mvideo'), 'в Мвидео')
          } else {
            this.itemsHandle(this.dbItems, 'во всех магазинах')
          }
        }
      }
    }
  },
  methods: {
    selectStore (store) {
      if (this.selectedStore === store) {
        this.selectedStore = ''
      } else {
        this.selectedStore = store
      }
    },
    itemsHandle (items, text, resetPagination = false) {
      this.items = items.slice(0, this.pagination.perPage)
      this.store = text
      this.countProducts = items.length
      this.rootItems = items
      let page = this.$route.params.page || 1
      let store = this.$route.query.store
      if (resetPagination) {
        this.$router.push({ name: this.$route.name, params: { page: 1 } })
      }
      if (page !== 1) {
        this.getItems()
      }
      if (store) {
        this.selectedStore = store
      }
    },
    getItems () {
      let page = this.$route.params.page || 1
      let perPage = this.pagination.perPage
      this.items = this.dbItems.slice((page - 1) * perPage, perPage * page)
    },
    applyPriceFilter (priceRange) {
      let filteredItems = []
      for (let itm of this.dbItems) {
        let price = parseInt(itm.newPrice.replace(/\s/g, ''))
        if (price >= priceRange.from && price <= priceRange.to) {
          filteredItems.push(itm)
        }
      }
      this.items = filteredItems
    }
  },
  beforeMount () {
    this.$bus.$on('change-price', (obj) => {
      this.applyPriceFilter(obj)
    })
  },
  computed: {
    maxPrice () {
      let maxPrice = 0
      for (let itm of this.rootItems) {
        let price = parseInt(itm.newPrice.replace(/\s/g, ''))
        if (price > maxPrice) {
          maxPrice = price
        }
      }
      return maxPrice
    }
  },
  components: {
    ProductTile,
    Pagination,
    PriceFilter
  },
  watch: {
    'selectedStore': function () {
      switch (this.selectedStore) {
        case 'eldorado':
          this.itemsHandle(this.dbItems.filter((e) => e.store === 'Eldorado'), 'в Эльдорадо', true)
          // this.$router.replace({ path: `${this.$route.path}?store=eldorado` })
          break
        case 'mvideo':
          this.itemsHandle(this.dbItems.filter((e) => e.store === 'Mvideo'), 'в Мвидео', true)
          // this.$router.replace({ path: `${this.$route.path}?store=mvideo` })
          break
        default:
          this.itemsHandle(this.dbItems, 'во всех магазинах', true)
      }
    },
    '$route': 'getItems'
  }
}
</script>

<style lang="css">
#stores .product-listing .product {
  width: 300px;
}
.content-container {
  box-sizing: border-box;
  background-color: #e8edee;
  height: auto;
  width: 70vw;
  margin: 0 auto;
  padding: 60px 30px;
}
.filters {
  margin-bottom: 20px;
}
.filter-title h3 {
  margin-right: 20px;
}
.filter-title span {
  transform: rotate(90deg);
  font-size: 20px;
  font-weight: bold;
  transition: transform .5s
}
.arrow-up {
  transform: rotate(-90deg) !important;
  transition: transform .5s
}
.all-filters {
  max-height: 200px;
  opacity: 1;
  transition: max-height .5s ease-out .2s, opacity .5s;
}
.all-filters .name {
  margin-bottom: 10px;
}
.store-list div {
  margin-bottom: 5px;
}
.hide {
  max-height: 0;
  opacity: 0;
  transition: max-height .5s ease-out .2s, opacity .5s;
}
.active-input {
  font-weight: 700;
}
</style>
