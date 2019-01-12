<template>
  <div v-if="product" id="product-page" class="global-container">
    <div class="breadcrumbs flex">
      <router-link class="cl-gray flex middle-xs" :to="{ name: 'Stores', params: { slug: 'all' } }">
        Каталог товаров <i class="material-icons">keyboard_arrow_right</i>
      </router-link>
      <router-link class="cl-gray flex middle-xs" :to="{ name: 'Stores', params: { slug: storeInfo.slug } }">
        {{ ` ${storeInfo.name} ` }} <i class="material-icons">keyboard_arrow_right</i>
      </router-link>
      <span class="cl-gray weight-700 flex middle-xs">{{ product.title }}</span>
    </div>
    <div class="product-content">
      <div class="product-image">
        <img :src="product.imageLink" alt="">
      </div>
      <div class="product-info">
        <div class="back-link">
          <span class="back-link-wrapper" @click="$router.go(-1)">
            <i class="material-icons icon-arrow-back">arrow_back</i>
            <span class="cl-gray">Назад</span>
          </span>
        </div>
        <div class="product-data">
          <div class="flex middle-xs">
            <router-link :to="{ name: 'Stores', params: { slug: storeInfo.slug } }">
            <img class="product-store-img" :src="getLogoLink(product.store)">
          </router-link>
          <div class="percent-discount cl-white weight-700">{{ `${percentDiscount}%` }}</div>
          </div>
          <div>
            <h2>{{ product.title }}</h2>
          </div>
          <div class="product-price">
            <span class="new-price">{{ product.newPrice }} &#8381;</span>
            <span class="old-price">{{ product.oldPrice }} &#8381;</span>
            <br>
            <span class="absolute-discount cl-white">{{ `-${absoluteDiscount} &#8381;` }}</span>
          </div>
          <div class="item-link">
            <span>
              На
              <a :href="product.itemLink" target="_blank" class="cl-blue weight-700"> сайт <i class="material-icons icon-link">link</i></a>
               ритейлера
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="relative-products">
      <h3 class="relative-product-title">Вас могут заинтересовать</h3>
      <slider :slides="relativeProducts" :count-slides="4" />
    </div>
  </div>
</template>

<script>
import { quickSearchByQuery } from '../helpers/search.js'
import Slider from '../components/Slider.vue'
import builder from 'bodybuilder'

export default {
  data () {
    return {
      product: null,
      relativeProducts: []
    }
  },
  components: {
    Slider
  },
  created () {
    this.loadCurrentProduct()
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
    },
    percentDiscount () {
      let newPrice = parseInt(this.product.newPrice)
      let oldPrice = parseInt(this.product.oldPrice)
      let discount = ((oldPrice - newPrice) / oldPrice) * 100
      return parseInt(discount)
    },
    absoluteDiscount () {
      return parseInt(this.product.oldPrice) - parseInt(this.product.newPrice)
    }
  },
  methods: {
    loadCurrentProduct () {
      let slug = this.$route.params.slug
      if (slug) {
        let query = builder().query('term', 'slug.keyword', slug).build()
        this.loadProducts({ query: query, size: 1 }).then(result => {
          if (result && result.hits && result.hits.total > 0) {
            this.product = result.hits.hits[0]
            this.loadRealtiveProducts()
          } else {
            this.$router.push({ name: 'Home' })
          }
        }).catch(err => {
          console.error(err)
        })
      }
    },
    loadProducts ({ query, size = 1 }) {
      return quickSearchByQuery({ query: query, size: size }).then(res => {
        return res
      }).catch(err => {
        console.error(err)
        return null
      })
    },
    loadRealtiveProducts () {
      let query = builder().query('term', 'store', this.product.store).build()
      this.loadProducts({ query: query, size: 10 }).then(result => {
        if (result && result.hits && result.hits.hits) {
          this.relativeProducts = result.hits.hits
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getLogoLink (store) {
      if (store === 'Eldorado') {
        return `${window.location.origin}/static/stores/eldorado.png`
      } else {
        return `${window.location.origin}/static/stores/mvideo.png`
      }
    }
  },
  watch: {
    '$route': 'loadCurrentProduct'
  }
}
</script>

<style lang="scss" scoped>
@import '../css/variables/colors.scss';
@import '../css/helpers/colors.scss';
$green: color(green);
$gray: color(gray);

#product-page {
  padding: 20px 10px;
}
.breadcrumbs {
  margin-bottom: 25px;
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
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px $gray;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  justify-content: start;
}
.back-link {
  cursor: pointer;
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid $gray;
  .icon-arrow-back {
    position: relative;
    left: 0;
    transition: 0.3s all;
    margin-right: 10px;
  }
}
.back-link-wrapper {
  display: flex;
  align-items: center;
}
.back-link-wrapper:hover .icon-arrow-back {
  transition: 0.3s all;
  left: -10px;
}
.product-store-img {
  height: 35px;
  margin-right: 10px;
}
.percent-discount {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $green;
  border-radius: 50%;
}
.new-price {
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
}
.old-price {
  font-size: 15px;
  color: $gray;
  text-decoration: line-through;
}
.absolute-discount {
  display: inline-block;
  margin: 10px 0;
  border-radius: 7px;
  padding: 5px;
  font-weight: bold;
  background-color: $green;
}
.item-link {
  .icon-link {
    position: relative;
    top: 7px;
  }
}
.relative-product-title {
  margin-top: 30px;
  padding: 0 20px;
}
</style>
