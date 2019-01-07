<template>
  <div v-if="product" id="product-page" class="container">
    <div class="breadcrumbs">
      <router-link :to="{ name: 'Stores', params: { slug: 'all' } }">
        Каталог товаров -
      </router-link>
      <router-link :to="{ name: 'Stores', params: { slug: storeInfo.slug } }">
        {{ ` ${storeInfo.name} - ` }}
      </router-link>
      <span>{{ product.title }}</span>
    </div>
    <div class="product-content">
      <div class="product-image">
        <img :src="product.imageLink" alt="">
      </div>
      <div class="product-info">
        <div class="back-link">
          <span @click="$router.go(-1)">
            Назад
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { quickSearchByQuery } from '../helpers/search.js'
import builder from 'bodybuilder'

export default {
  data () {
    return {
      product: null
    }
  },
  created () {
    let slug = this.$route.params.slug
    if (slug) {
      let query = builder().query('term', 'slug.keyword', slug).build()
      quickSearchByQuery({ query: query, size: 1 }).then(result => {
        if (result && result.hits && result.hits.total === 1) {
          this.product = result.hits.hits[0]
        } else {
          this.$router.push({ name: 'Home' })
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  computed: {
    storeInfo () {
      if (this.product) {
        switch (this.product.store) {
          case 'Mvideo':
            return { name: 'Мвидео', slug: 'mvideo' }
          case 'Eldorado':
            return { name: 'Эльдорадо', slug: 'eldorado' }
          default:
            return { name: '', slug: '' }
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#product-page {
  padding: 20px 10px;
}
.product-content {
  display: flex;
}
.product-image {
  box-sizing: border-box;
  display: flex;
  flex-basis: 50%;
  justify-content: center;
  img {
    height: 300px;
    width: auto;
  }
}
.product-info {
  box-sizing: border-box;
  display: flex;
  flex-basis: 50%;
  justify-content: center;
}
.back-link {
  cursor: pointer;
}
</style>
