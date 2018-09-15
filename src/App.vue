<template>
  <div id="app">
    <main-header />
    <router-view/>
    <main-footer />
  </div>
</template>

<script>
import MainHeader from './components/Header.vue'
import MainFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style src="./css/flexbox-grid.css" lang="css"></style>
<style src="./css/position.css" lang="css"></style>
<style src="./css/visual.css" lang="css"></style>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Roboto Medium', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-repeat: repeat;

}
</style>
