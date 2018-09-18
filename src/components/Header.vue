<template>
  <div id="header">
    <div class="header relative col-xs-12 flex middle-xs center-xs">
      <div class="logo col-xs-3 flex start-xs">
        <router-link :to="{ name: 'Home' }">
          <img src="../../static/Logotip2.png">
        </router-link>
      </div>
      <div class="navigation col-xs-6 flex middle-xs center-xs">
        <router-link :class="checkCurrentPath('stores') ? 'active-link' : ''" :to="{ name: 'Stores', params: { slug: 'all' } }">Акции</router-link>
        <router-link :to="{ path: '/' }">Магазины</router-link>
        <search class="search" v-if="$route.name !== 'Home'" />
      </div>
      <div class="col-xs-3" />
    </div>
  </div>
</template>

<script>
import Search from './search.vue'

export default {
  components: {
    Search
  },
  methods: {
    checkCurrentPath (storeName) {
      return this.$route.path.includes(storeName)
    }
  }
}
</script>

<style lang="scss">
#header {
  .search {
    border-radius: 5px;
    input {
      height: 40px;
      border: 1px solid #d4d4d4;
      transition: all .3s;
      &:focus {
        border-color: #276eef;
        transition: all .3s;
      }
    }
    .icon {
      font-size: 25px;
      color: black;
    }
  }
}
</style>

<style lang="scss" scoped>
#header {
  z-index: 3;
  box-shadow: 0 2px 8px 2px rgba(0,0,0,.05);
  position: relative;
}
.header {
  box-sizing: border-box;
  padding: 0 20px;
  width: 100vw;
  margin: 0 auto;
  height: 60px;
  color: white;
}
.active-link {
  border-top: 4px solid #276eef !important;
  color: #276eef !important;
  font-weight: 700 !important;
}
.logo {
  left: 10px;
}
.navigation a {
  border-top: 2px solid gray;
  padding: 7px 5px;
  margin-right: 30px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  transition: 0.3s color;
}
.navigation a:hover {
  border-top: 4px solid gray;
  color: #276eef;
  transition: 0.3s color;
}
img {
  height: 50px;
  width: auto;
}
</style>
