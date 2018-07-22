<template>
  <div id="stores" class="content-container">
    <div class="col-xs-12 flex start-xs middle-xs">
      <h2>Товары со скидками {{ store }}</h2>
    </div>
    <div class="col-xs-12 filters">
      <div class="filter-title flex middle-xs">
        <h3 @click="hide = !hide" class="pointer">Фильтры</h3>
        <span class="pointer" :class="hide ? 'arrow-up' : ''">&#8250;</span>
      </div>
      <div class="all-filters" :class="hide ? 'hide' : ''">
        <div v-if="$route.params.slug === 'all'" class="store-filter">
          <div class="name">
            Магазин
          </div>
          <div class="store-list">
            <div class="" v-for="(store, index) in storeList" :key="index">
              <input type="radio" :name="store.name" value=""
                :checked="selectedStore === store.name" @click="selectStore(store.name)">
              <label :for="store.name" @click="selectStore(store.name)">{{ store.title }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-listing flex between-xs flex-wrap">
      <div class="" v-for="(product, index) in items" :key="index">
        <product-tile :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductTile from '../components/ProductTile.vue'
import EldoradoItems from '../../stores/data/eldorado.json'
import MvideoItems from '../../stores/data/mvideo.json'

export default {
  data () {
    return {
      items: [],
      store: '',
      storeList: [
        {
          title: 'Эльдорадо',
          name: 'eldorado'
        },
        {
          title: 'Мвидео',
          name: 'mvideo'
        }
      ],
      selectedStore: '',
      hide: false
    }
  },
  methods: {
    selectStore (store) {
      if (this.selectedStore === store) {
        this.selectedStore = ''
      } else {
        this.selectedStore = store
      }
    }
  },
  created () {
    let slug = this.$route.params.slug
    if (slug) {
      if (slug === 'eldorado') {
        this.items = EldoradoItems.items
        this.store = 'в Эльдорадо'
      } else if (slug === 'mvideo') {
        this.items = MvideoItems.items
        this.store = 'в Мвидео'
      } else {
        this.items = EldoradoItems.items.concat(MvideoItems.items)
        this.store = 'во всех магазинах'
      }
    }
  },
  components: {
    ProductTile
  },
  watch: {
    'selectedStore': function () {
      switch (this.selectedStore) {
        case 'eldorado':
          this.items = EldoradoItems.items
          break
        case 'mvideo':
          this.items = MvideoItems.items
          break
        default:
          this.items = EldoradoItems.items.concat(MvideoItems.items)
      }
    }
  }
}
</script>

<style lang="css">
#stores .product-listing .product {
  width: 300px;
}
.content-container {
  box-sizing: border-box;
  background-color: #e8edee;
  height: auto;
  width: 70vw;
  margin: 0 auto;
  padding: 60px 30px;
}
.filters {
  margin-bottom: 20px;
}
.filter-title h3 {
  margin-right: 20px;
}
.filter-title span {
  transform: rotate(90deg);
  font-size: 20px;
  font-weight: bold;
  transition: transform .5s
}
.arrow-up {
  transform: rotate(-90deg) !important;
  transition: transform .5s
}
.all-filters {
  max-height: 200px;
  opacity: 1;
  transition: max-height .5s ease-out .2s, opacity .5s;
}
.all-filters .name {
  margin-bottom: 10px;
}
.store-list div {
  margin-bottom: 5px;
}
.hide {
  max-height: 0;
  opacity: 0;
  transition: max-height .5s ease-out .2s, opacity .5s;
}
</style>
