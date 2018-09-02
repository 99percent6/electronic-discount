<template>
  <div id="header">
    <div class="header relative col-xs-12 flex middle-xs center-xs">
      <div class="logo col-xs-3">
        <router-link :to="{ name: 'Home' }">
          <img src="../../static/Logotip2.png">
        </router-link>
      </div>
      <div class="navigation col-xs-6">
        <router-link :to="{ name: 'Stores', params: { slug: 'all' } }">Акции</router-link>
        <router-link :to="{ path: '/' }">Магазины</router-link>
      </div>
      <div class="col-xs-3" />
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="css" scoped>
#header {
  background-color: white;
}
.header {
  box-sizing: border-box;
  padding: 0 20px;
  width: 70vw;
  margin: 0 auto;
  height: 60px;
  color: white;
  z-index: 5;
}
.logo {
  left: 10px;
}
.navigation a {
  margin-right: 30px;
  font-weight: bold;
  color: black;
  text-decoration: none;
}
.navigation a:hover {
  color: #276eef;
}
img {
  height: 50px;
  width: auto;
}
</style>
