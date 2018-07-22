<template>
  <div class="product col-xs-12">
    <div class="product-image flex center-xs">
      <img v-lazy="imageObj">
    </div>
    <div class="product-descr relative flex center-xs">
      <div class="product-name">
        {{ product.title }}
      </div>
      <div class="product-price">
        <span class="new-price">{{ `${product.newPrice} &#8381;` }}</span>
        <span class="old-price">{{ `${product.oldPrice} &#8381;` }}</span>
      </div>
      <div class="store absolute">
        <img :src="getLogoLink(product.store)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    imageObj () {
      return {
        src: this.product.imageLink,
        loading: '../../static/logo.png',
        error: '../../static/logo.png'
      }
    }
  },
  methods: {
    getLogoLink (store) {
      if (store === 'Eldorado') {
        return '../../static/stores/eldorado.png'
      } else {
        return '../../static/stores/mvideo.png'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.product {
  padding-top: 25px;
  padding-bottom: 5px;
  background-color: white;
  height: auto;
  min-height: 280px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 15px;
  box-sizing: border-box;
  position: relative;
}
.product-name {
  font-size: 13px;
  word-wrap: break-word;
}
.product-price {
  position: absolute;
  top: 5px;
  left: 15px;
}
.new-price {
  color: green;
  margin-right: 5px;
}
.old-price {
  font-size: 13px;
  color: red;
  text-decoration: line-through;
}
.product-image img {
  height: 170px;
  width: 100%;
  object-fit: contain;
  max-width: 242px;
  margin-bottom: 5px;
}
.store {
  right: 10px;
  bottom: 10px;
}
.store img {
  height: 20px;
  width: auto;
}
</style>
