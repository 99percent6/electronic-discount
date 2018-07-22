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

export default {
  props: ['items', 'imgLink'],
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
      swiperSlides: this.items
    }
  },
  components: {
    swiper,
    swiperSlide,
    ProductTile
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

<style lang="css">
  .swiper-pagination {
    position: relative;
  }
</style>

<style lang="css" scoped>
.carousel-container {
  box-sizing: border-box;
  margin-top: 30px;
}
</style>
