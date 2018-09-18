<template>
  <div class="search-panel relative">
    <label for="search">
      <input id="search" type="text" :placeholder="placeholder" v-model="searchText" @keyup.enter="search()"/>
      <i class="material-icons icon pointer" @click="search()">search</i>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      placeholder: 'Поиск товаров со скидками...'
    }
  },
  beforeMount () {
    this.searchText = this.$route.params.searchText || ''
  },
  methods: {
    search () {
      if (this.searchText) {
        this.$router.push({ name: 'Search', params: { searchText: this.searchText } })
      } else {
        this.placeholder = 'Пожалуйста, введите наименование товара...'
      }
    }
  },
  watch: {
    '$route': function () {
      this.searchText = this.$route.path.search(/search/) !== -1 ? this.$route.params.searchText || '' : ''
    }
  }
}
</script>

<style lang="css" scoped>
input {
  font-size: 16px;
  width: 500px;
  height: 45px;
  border-radius: 5px;
  border: none;
  padding: 0 15px;
  outline: none;
}
.icon {
  position: absolute;
  top: 8px;
  right: 8px;
  padding-left: 10px;
  font-size: 30px;
  border-left: 1px solid gray;
}
</style>
