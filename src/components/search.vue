<template>
  <div class="search-panel">
    <label for="search">
      <input id="search" type="text" :placeholder="placeholder" v-model="searchText" @keyup.enter="search()"/>
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
  methods: {
    search () {
      if (this.searchText) {
        this.$router.push({ name: 'Search', params: { searchText: this.searchText } })
      } else {
        this.placeholder = 'Пожалуйста, введите наименование товара...'
      }
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
</style>
