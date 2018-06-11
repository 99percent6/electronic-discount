<template>
  <div class="product col-xs-12">
    <div class="product-image">
      <img :src="product.imageLink">
    </div>
    <div class="product-descr">
      <div class="product-name">
        {{ product.title }}
      </div>
      <div class="product-price">
        <span class="new-price">{{ `${product.newPrice} &#8381;` }}</span>
        <span class="old-price">{{ `${product.oldPrice} &#8381;` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
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
img {
  height: 170px;
  width: 100%;
  object-fit: contain;
  max-width: 242px;
  margin-bottom: 5px;
}
</style>
