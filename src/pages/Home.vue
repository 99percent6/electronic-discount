<template>
  <div id="home">
    <div class="background">
    </div>
    <div class="row home-container">
      <div class="products col-xs-12 col-md-6 center-xs middle-xs">
        <slider :items="eldoItems" imgLink="/static/stores/eldorado.png"/>
        <slider :items="mvideoItems" imgLink="/static/stores/mvideo.png"/>
      </div>
      <div class="stores col-xs-12 col-md-6 center-xs middle-xs">
        Магазины
      </div>
    </div>
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import Slider from '../components/Slider.vue'
import EldoradoItems from '../../stores/data/eldorado.json'
import Mvideo from '../../stores/data/mvideo.json'

export default {
  data () {
    return {
      eldoItems: EldoradoItems.items,
      mvideoItems: Mvideo.items
    }
  },
  components: {
    ProductTile,
    Slider
  }
}
</script>

<style lang="css" scoped>
#home {
  height: 100vh;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.background {
  height: 102vh;
  width: 102vw;
  margin: -10px;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
  position: absolute;
  z-index: -1;
}
.home-container {
  height: inherit;
  margin: 0;
}
.products {
  background-color: rgba(220, 220, 220, 0.7);
  padding-top: 70px;
}
.stores {
  background-color: rgba(255, 255, 255, 0.7);
  padding-top: 70px;
}
</style>
