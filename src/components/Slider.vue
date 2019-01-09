<template>
  <div class="carousel-container global-container">
    <swiper :options="swiperOption">
      <swiper-slide v-if="slide.newPrice && slide.oldPrice" v-for="(slide, index) in slides" :key="index">
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

export default {
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => []
    },
    countSlides: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: this.countSlides,
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
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    ProductTile
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
