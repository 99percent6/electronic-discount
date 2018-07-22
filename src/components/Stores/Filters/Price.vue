<template>
  <div class="price-filter">
    <div class="price-title">
      Цена
    </div>
    <div class="price-slider">
      <vue-slider ref="slider" v-model="value" v-bind="options" @callback="switchFilter()"></vue-slider>
      <div class="input flex between-xs middle-xs">
        <input class="" @keyup.enter="switchFilter()" v-model="value[0]">
        <span class="">&mdash;</span>
        <input class="" @keyup.enter="switchFilter()" v-model="value[1]">
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  data () {
    return {
      value: [
        0,
        this.maxPrice
      ],
      options: {
        max: this.maxPrice,
        tooltip: false,
        sliderStyle: {
          'backgroundColor': '#FFFFFF'
        },
        processStyle: {
          'backgroundColor': '#FC3768'
        },
        height: 4,
        dotSize: 20
      }
    }
  },
  props: {
    maxPrice: {
      type: Number,
      default: 100000
    }
  },
  components: {
    VueSlider
  },
  methods: {
    switchFilter () {
      this.$bus.$emit('change-price', { from: parseInt(this.value[0]), to: parseInt(this.value[1]) })
    }
  }
}
</script>

<style lang="scss" scoped>
.price-title {
  margin-bottom: 10px;
}
.input {
  margin-top: 10px;
  input {
    border-radius: 5px;
    text-align: center;
    padding: 7px;
    border: 1px solid #BBBBBB;
    width: 30%;
    &:focus {
      outline: none;
      border-color: #FC3768;
    }
  }
  span {
    font-weight: 700;
    font-size: 12px;
  }
}
</style>
