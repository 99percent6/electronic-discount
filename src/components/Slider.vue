<template>
  <div class="carousel-container">
    <div class="logo">
      <img v-lazy="imageObj">
    </div>
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
        slidesPerView: 3,
        spaceBetween: 30,
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
  background-color: rgba(194, 194, 194, 0.3);
}
.logo {
  padding-top: 20px;
  margin-bottom: 10px;
}
img {
  width: 200px;
}
</style>
