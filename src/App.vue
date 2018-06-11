<template>
  <div id="app">
    <main-header />
    <router-view/>
  </div>
</template>

<script>
import MainHeader from './components/Header.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style src="./css/flexbox-grid.css" lang="css"></style>
<style src="./css/position.css" lang="css"></style>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
