<template>
  <div class="product col-xs-12">
    <div class="product-image flex center-xs">
      <img :src="product.imageLink">
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
        loading: `${window.location.origin}/static/logo.png`,
        error: `${window.location.origin}/static/logo.png`
      }
    }
  },
  methods: {
    getLogoLink (store) {
      if (store === 'Eldorado') {
        return `${window.location.origin}/static/stores/eldorado.png`
      } else {
        return `${window.location.origin}/static/stores/mvideo.png`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  border: 1px solid #ABABAB;
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
  transition: 0.3s all;
  &:hover {
    margin-top: -5px;
    box-shadow: 0 0 40px 0 rgba(0,0,0,.1);
  }
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
  top: 5px;
}
.store img {
  height: 20px;
  width: auto;
}
</style>
