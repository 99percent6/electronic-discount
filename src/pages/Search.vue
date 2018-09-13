<template>
  <div id="search" class="search-page-container">
    <div class="col-xs-12 flex start-xs middle-xs">
      <h2>Результаты поиска для "{{ searchText }}"</h2>
    </div>
    <div v-if="items && items.length > 0" class="product-listing col-xs-12 flex between-xs flex-wrap">
      <div class="" v-for="(product, index) in items" :key="index">
        <product-tile :product="product" />
      </div>
    </div>
    <div v-else class="col-xs-12">
      <div class="empty-text">По вашему запросу ничего не найден. Попробуйте найти что-то другое.</div>
      <search-panel />
    </div>
    <pagination />
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import Pagination from '../components/Pagination.vue'
import SearchPanel from '../components/search.vue'
import builder from 'bodybuilder'
import { quickSearchByQuery } from '../lib/search.js'

export default {
  data () {
    return {
      searchText: '',
      items: [],
      pagination: {
        perPage: 20
      },
      countProducts: 0
    }
  },
  components: {
    ProductTile,
    Pagination,
    SearchPanel
  },
  created () {
    this.searchText = this.$route.params.searchText
    this.loadItems()
  },
  methods: {
    loadItems () {
      let page = this.$route.params.page || 1
      let query = builder().query('query_string', { 'default_field': 'title', 'query': this.searchText })
      quickSearchByQuery({ query: query.build(), size: this.pagination.perPage, from: (page - 1) * this.pagination.perPage }).then(res => {
        if (res && res.hits) {
          this.countProducts = res.hits.total
          this.items = res.hits.hits
        }
      })
    }
  },
  watch: {
    '$route': function () {
      this.searchText = this.$route.params.searchText
      this.loadItems()
    }
  }
}
</script>

<style lang="scss" scoped>
#search .product-listing .product {
  width: 300px;
}
.search-page-container {
  margin-top: 60px;
  box-sizing: border-box;
  background-color: #e8edee;
  height: auto;
  width: 70vw;
  margin: 0 auto;
  padding: 60px 30px;
}
.empty-text {
  margin-bottom: 20px;
}
</style>
