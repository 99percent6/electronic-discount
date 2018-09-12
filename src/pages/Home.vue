<template>
  <div id="home">
    <div class="background flex center-xs middle-xs">
      <search-panel />
    </div>
    <div class="content-container">
      <div class="store col-xs-12 center-xs middle-xs">
        <stores />
      </div>
      <div class="products col-xs-12 center-xs middle-xs">
        <div class="title">
          <h2>Текущие акции</h2>
        </div>
        <slider store="Eldorado" imgLink="/static/stores/eldorado.png"/>
        <slider store="Mvideo" imgLink="/static/stores/mvideo.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import Slider from '../components/Slider.vue'
import SearchPanel from '../components/search.vue'
import Stores from '../components/Stores/Stores.vue'

export default {
  components: {
    ProductTile,
    Slider,
    SearchPanel,
    Stores
  }
}
</script>

<style lang="css" scoped>
#home {
  position: relative;
  box-sizing: border-box;
}
.background {
  height: 80vh;
  width: 100%;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 -100px;
  position: relative;
}
.content-container {
  background-color: #f2f7f9;
  width: 70vw;
  margin: 0 auto;
}
.products {
  margin: 0 auto;
}
.stores {
  /* background-color: rgba(255, 255, 255, 0.7); */
  padding-top: 70px;
}
.stores-logo {
  padding-top: 30px;
  flex-wrap: wrap;
}
img {
  width: 200px;
  margin: 20px;
}
</style>
