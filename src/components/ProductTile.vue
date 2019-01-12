<template>
  <div class="product col-xs-12">
    <router-link :to="{ name: 'Product', params: { slug: product.slug } }">
      <div class="product-price">
        <span class="new-price">{{ `${product.newPrice} &#8381;` }}</span>
        <span v-if="product.oldPrice" class="old-price">{{ `${product.oldPrice} &#8381;` }}</span>
        <span class="discount cl-white weight-700">{{ `-${priceDiscount}` }}</span>
      </div>
      <div class="product-image flex center-xs">
        <img :src="product.imageLink">
      </div>
      <div class="product-descr flex center-xs">
        <div class="product-name">
          {{ product.title }}
        </div>
      </div>
      <div class="line" />
      <div class="store">
        <img :src="getLogoLink(product.store)">
      </div>
    </router-link>
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
    },
    priceDiscount () {
      return parseFloat(this.product.oldPrice) - parseFloat(this.product.newPrice)
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
@import '../css/variables/colors.scss';
@import '../css/helpers/colors.scss';
$gray: color(gray);
$green: color(green);

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ABABAB;
  padding-top: 35px;
  padding-bottom: 5px;
  background-color: white;
  height: auto;
  min-height: 300px;
  border-radius: 5px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 15px;
  box-sizing: border-box;
  position: relative;
  transition: 0.3s all;
  &:hover .product-image img {
    transform: scale(1.2, 1.2);
    transition: 0.3s all;
  }
}
.product-descr {
  margin-top: 7px;
  flex-direction: column;
}
.product-name {
  font-size: 13px;
  word-wrap: break-word;
  transition: 0.3s all;
}
.product-price {
  position: absolute;
  top: 10px;
  left: 15px;
  z-index: 2;
}
.new-price {
  font-weight: bold;
  margin-right: 5px;
}
.old-price {
  font-size: 13px;
  color: #b3b3b3;
  text-decoration: line-through;
}
.discount {
  display: inline-block;
  font-size: 15px;
  margin-left: 10px;
  padding: 3px;
  border-radius: 5px;
  background-color: $green;
}
.product-image {
  overflow: hidden;
  z-index: 1;
  img {
    height: 170px;
    width: 100%;
    object-fit: contain;
    max-width: 242px;
    margin-bottom: 5px;
    transition: scale(1, 1);
    transition: 0.3s all;
  }
}
.store {
  position: absolute;
  bottom: -5px;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
.store img {
  height: 20px;
  width: auto;
}
.line {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -40%;
  width: 80%;
  border-top: 1px solid $gray;
}
</style>
