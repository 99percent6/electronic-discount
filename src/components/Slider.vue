<template>
  <div class="carousel-container container">
    <swiper :options="swiperOption">
      <swiper-slide v-if="slide.newPrice && slide.oldPrice" v-for="(slide, index) in swiperSlides" :key="index">
        <product-tile :product="slide"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- <swiper :options="swiperOption" ref="mySwiper">
    </swiper> -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductTile from './ProductTile.vue'
import { quickSearchByQuery } from '../helpers/search.js'

export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            slidesOffsetBefore: 5
          },
          1280: {
            slidesPerView: 4,
            slidesOffsetBefore: 55
          }
        }
      },
      swiperSlides: []
    }
  },
  components: {
    swiper,
    swiperSlide,
    ProductTile
  },
  created () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      quickSearchByQuery({ size: 15 }).then(res => {
        if (res && res.hits) {
          this.swiperSlides = res.hits.hits
        }
      })
    }
  }
}
</script>

<style lang="scss">
.carousel-container {
  .swiper-container {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
.swiper-pagination {
  position: relative;
}
</style>

<style lang="scss" scoped>
.carousel-container {
  box-sizing: border-box;
  margin-top: 30px;
  padding: 0 20px;
}
</style>
