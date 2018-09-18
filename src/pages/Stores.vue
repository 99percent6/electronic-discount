<template>
  <div id="stores" class="stores-container-page">
    <div class="col-xs-12 flex start-xs middle-xs">
      <h2>Товары со скидками {{ store }}</h2>
    </div>
    <div class="col-xs-12 flex">
      <div class="filters col-xs-6">
        <div class="filter-title flex middle-xs">
          <h3 @click="hide = !hide" class="pointer">Фильтры</h3>
          <span class="pointer" :class="hide ? 'arrow-up' : ''">&#8250;</span>
        </div>
        <div class="all-filters flex flex-wrap" :class="hide ? 'hide' : ''">
          <div class="store-filter col-xs-12 col-md-4">
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
          <div class="col-xs-12 col-md-4">
            <price-filter :max-price="maxPrice"/>
          </div>
        </div>
      </div>
      <sorting class="col-xs-6" />
    </div>
    <div class="product-listing flex around-xs flex-wrap">
      <div class="" v-if="product.newPrice && product.oldPrice" v-for="(product, index) in items" :key="index">
        <product-tile :product="product" />
      </div>
    </div>
    <pagination />
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import Pagination from '../components/Pagination.vue'
import PriceFilter from '../components/Stores/Filters/Price.vue'
import Sorting from '../components/Stores/Sorting.vue'
import builder from 'bodybuilder'
import { quickSearchByQuery } from '../helpers/search.js'

export default {
  data () {
    return {
      items: [],
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
        perPage: 16
      },
      countProducts: 0,
      maxPrice: 0
    }
  },
  created () {
    let slug = this.$route.params.slug
    if (slug) {
      this.selectedStore = slug
    }
    this.loadItems()
    this.getMaxPrice()
  },
  methods: {
    loadItems () {
      let self = this
      let slug = this.$route.params.slug
      let page = this.$route.params.page || 1
      let minPrice = this.$route.query.from || null
      let maxPrice = this.$route.query.to || null
      let sort = function () {
        let currentSort = self.$route.query.sort || null
        if (currentSort && currentSort !== 'Умолчанию') {
          if (currentSort === 'Убыванию цены') {
            return 'newPrice:desc'
          } else {
            return 'newPrice:asc'
          }
        } else {
          return 'title:asc'
        }
      }
      let query = null
      if (slug !== 'all') {
        if (slug === 'eldorado') {
          query = builder().query('term', 'store', 'Eldorado')
        }
        if (slug === 'mvideo') {
          query = builder().query('term', 'store', 'Mvideo')
        }
      }
      if (minPrice || maxPrice) {
        if (query) {
          query = query.query('range', { 'newPrice': { 'gte': minPrice, 'lte': maxPrice } })
        } else {
          query = builder().query('range', { 'newPrice': { 'gte': minPrice, 'lte': maxPrice } })
        }
      }
      quickSearchByQuery({ query: query ? query.build() : {}, size: this.pagination.perPage, from: (page - 1) * this.pagination.perPage, sort: sort() }).then(res => {
        if (res && res.hits) {
          this.countProducts = res.hits.total
          this.items = res.hits.hits
        }
      })
    },
    getMaxPrice () {
      let slug = this.$route.params.slug
      let query = builder().aggregation('terms', 'new')
      if (slug) {
        if (slug === 'all') {
          query = builder()
        }
        if (slug === 'eldorado') {
          query = builder().query('term', 'store', 'Eldorado')
        }
        if (slug === 'mvideo') {
          query = builder().query('term', 'store', 'Mvideo')
        }
        quickSearchByQuery({ query: query.build(), size: 1, sort: 'newPrice:desc' }).then(res => {
          if (res && res.hits && res.hits.total > 0) {
            this.maxPrice = res.hits.hits[0].newPrice
          }
        })
      }
    },
    selectStore (store) {
      this.resetPage()
      if (this.selectedStore === store) {
        this.selectedStore = ''
      } else {
        this.selectedStore = store
      }
    },
    resetPage () {
      this.$route.params.page = 1
    }
  },
  components: {
    ProductTile,
    Pagination,
    PriceFilter,
    Sorting
  },
  watch: {
    'selectedStore': function () {
      let query = this.$route.query
      switch (this.selectedStore) {
        case 'eldorado':
          this.$router.replace({ name: this.$route.name, params: { slug: 'eldorado' }, query: query || '' })
          break
        case 'mvideo':
          this.$router.replace({ name: this.$route.name, params: { slug: 'mvideo' }, query: query || '' })
          break
        default:
          this.$router.replace({ name: this.$route.name, params: { slug: 'all' }, query: query || '' })
      }
      this.getMaxPrice()
    },
    '$route': 'loadItems'
  }
}
</script>

<style lang="scss">
#stores {
  z-index: 1;
  background: #f7f6f2;
  .product-listing .product {
    width: 300px;
  }
}
.stores-container-page {
  box-sizing: border-box;
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
