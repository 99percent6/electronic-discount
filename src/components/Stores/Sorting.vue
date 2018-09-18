<template>
  <div id="sort" class="sort">
    <div class="flex middle-xs">
      <span class="sort-title">Сортировать по:</span>
      <div class="sort-item pointer"
        v-for="(item, index) in sortList"
        :key="index"
        @click="selectSort(item.name)"
        :class="item.name === selectedSort ? 'active-item' : ''">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sortList: [
        { name: 'Умолчанию' },
        { name: 'Убыванию цены' },
        { name: 'Возрастанию цены' }
      ],
      selectedSort: ''
    }
  },
  created () {
    this.selectedSort = this.$route.query.sort || ''
  },
  methods: {
    selectSort (sort) {
      this.selectedSort = sort
      let query = this.$route.query
      let price = ''
      if (query && (query.from || query.to)) {
        price = `from=${query.from}&to=${query.to}`
      }
      this.$router.replace({ path: `${this.$route.path}?${price}&sort=${sort}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.sort {
  margin-top: 18px;
  margin-bottom: 18px;
}
.sort-title {
  margin-right: 15px;
}
.sort-item {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
  transition: .3s all;
  &:hover {
    background: #276eef;
    color: white;
    transition: .3s all;
  }
}
.active-item {
  background: #276eef;
  color: white;
}
</style>
