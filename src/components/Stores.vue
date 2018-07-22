<template>
  <div class="stores-container">
    <div class="name">
      <h2>Магазины</h2>
    </div>
    <div class="content flex col-xs-12 center-xs middle-xs">
      <div class="store" v-for="(logo, index) in logos" :key="index">
        <router-link :to="{ name: logo.linkName, params: { slug: logo.slug } }">
          <img :src="logo.imgPath">
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
          imgPath: '/static/stores/eldorado.png',
          linkName: 'Stores',
          slug: 'eldorado'
        },
        {
          imgPath: '/static/stores/mvideo.png',
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
  margin-right: 20px;
}
img {
  width: 200px;
}
</style>
