<template>
  <div class="carousel-container">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides.slice(0, 10)" :key="index">
        <product-tile :product="slide"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <swiper :options="swiperOption" ref="mySwiper">
    </swiper> -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductTile from './ProductTile.vue'
import { quickSearchByQuery } from '../lib/search.js'
import builder from 'bodybuilder'

export default {
  props: ['store', 'imgLink'],
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000
        },
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 2,
            slidesOffsetBefore: 5
          },
          1280: {
            slidesPerView: 3,
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
      let query = builder().query('term', 'store', this.store)
      quickSearchByQuery({ query: query.build(), size: 10 }).then(res => {
        if (res && res.hits) {
          this.swiperSlides = res.hits.hits
        }
      })
    }
  },
  computed: {
    imageObj () {
      return {
        src: this.imgLink
      }
    }
  }
}
</script>

<style lang="scss">
.carousel-container {
  .swiper-container {
    padding-top: 20px;
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
}
</style>
