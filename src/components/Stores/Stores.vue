<template>
  <div class="stores-container">
    <div class="name">
      <h2>Скидки в магазинах</h2>
    </div>
    <div class="content flex col-xs-12 center-xs middle-xs">
      <div class="store" v-for="(logo, index) in logos" :key="index">
        <router-link :to="{ name: logo.linkName, params: { slug: logo.slug } }">
          <div class="store-card flex middle-xs">
            <div class="store-card-image">
              <img :src="logo.backgroundPath">
              <div class="placeholder" />
            </div>
            <div class="store-card-content flex center-xs middle-xs">
              <img :src="logo.logoPath">
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logos: [
        {
          logoPath: '/static/stores/eldorado.png',
          backgroundPath: '/static/stores/MacBook.jpg',
          linkName: 'Stores',
          slug: 'eldorado'
        },
        {
          logoPath: '/static/stores/mvideo.png',
          backgroundPath: '/static/stores/MacBook and iPad.jpg',
          linkName: 'Stores',
          slug: 'mvideo'
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.stores-container {
  padding: 20px;
}
.content {
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
}
.name h2 {
  margin: 0;
}
.store {
  margin: 0 20px;
}
.store-card {
  width: 200px;
  height: 250px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: column;
  box-shadow: 0 0 40px 0 rgba(0,0,0,.6);
}
.store-card-image {
  height: 125px;
  overflow: hidden;
}
.store-card-content {
  height: 125px;
  width: 100%;
}
.store-card-image img {
  width: 200px;
  transition: scale(1, 1);
  transition: 0.3s all;
}
.store-card:hover .store-card-image img {
  transform: scale(1.1, 1.1);
  transition: 0.3s all;
}
.store-card:hover .store-card-image .placeholder {
  opacity: 1;
  transition: 0.3s all;
}
.store-card-content img {
  width: 100px;
}
.placeholder {
  position: relative;
  top: -137px;
  opacity: 0;
  width: 200px;
  height: 125px;
  background-color: rgba(0, 0, 0, 0.4);
  transition: 0.3s opacity;
}
</style>
