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
        <slider :items="eldoItems" imgLink="/static/stores/eldorado.png"/>
        <slider :items="mvideoItems" imgLink="/static/stores/mvideo.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import Slider from '../components/Slider.vue'
import EldoradoItems from '../../stores/data/eldorado.json'
import MvideoItems from '../../stores/data/mvideo.json'
import SearchPanel from '../components/search.vue'
import Stores from '../components/Stores/Stores.vue'
import { database } from './Stores.vue'

export default {
  data () {
    return {
      eldoItems: [],
      mvideoItems: []
    }
  },
  firebase: {
    // dbItems: {
    //   source: database.ref('/items').limitToFirst(10),
    //   dbItems: true
    // }
    dbItems: database.ref('/items').limitToFirst(10),
    dbItems2: database.ref('/items').orderByChild('store').equalTo('Mvideo')
  },
  created () {
    for (let item of EldoradoItems.items) {
      Object.assign(item, { store: 'Eldorado' })
      this.eldoItems.push(item)
    }
    for (let item of MvideoItems.items) {
      Object.assign(item, { store: 'Mvideo' })
      this.mvideoItems.push(item)
    }
  },
  computed: {
    items () {
      return this.dbItems
    },
    items2 () {
      return this.dbItems2
    }
  },
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
