<template>
  <div id="header">
    <div class="header relative col-xs-12 flex middle-xs center-xs">
      <div class="logo absolute">
        <router-link :to="{ name: 'Home' }">
          <img src="../../static/Logotip.png">
        </router-link>
      </div>
      <div class="navigation">
        <router-link :to="{ name: 'Stores', params: { slug: 'all' } }">Все акции</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="css" scoped>
.header {
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  z-index: 5;
}
.logo {
  left: 10px;
}
.navigation a {
  margin-right: 30px;
  font-weight: bold;
  color: #3ed1cd;
  text-decoration: none;
}
img {
  height: 50px;
  width: auto;
}
</style>
