<template>
  <div id="home">
    <div class="background flex center-xs middle-xs">
      <search-panel />
    </div>
    <div class="content-container global-container">
      <div class="store col-xs-12 center-xs middle-xs">
        <stores />
      </div>
    </div>
    <div class="products col-xs-12 center-xs middle-xs">
      <div class="title">
        <h2>Текущие акции</h2>
      </div>
      <slider :slides="slides"/>
    </div>
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import Slider from '../components/Slider.vue'
import SearchPanel from '../components/search.vue'
import Stores from '../components/Stores/Stores.vue'
import { quickSearchByQuery } from '../helpers/search.js'

export default {
  data () {
    return {
      slides: []
    }
  },
  components: {
    ProductTile,
    Slider,
    SearchPanel,
    Stores
  },
  created () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      quickSearchByQuery({ size: 15 }).then(res => {
        if (res && res.hits) {
          this.slides = res.hits.hits
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
#home {
  position: relative;
  box-sizing: border-box;
}
.background {
  height: 50vh;
  width: 100%;
  background-image: url('../assets/background.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 -100px;
  position: relative;
}
.content-container {
  background-color: #f2f7f9;
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
