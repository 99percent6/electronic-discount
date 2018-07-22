<template>
  <div class="pagination" v-show="pageCount && pageCount > 1 && activePage <= pageCount">
    <div class="container">
      <div class="flex middle-xs center-xs align-center">
        <div v-for="(pageNumber, key) in pageCount" :key="key" v-if="(Math.abs(pageNumber - activePage) < 3 && (activePage == 1 || activePage == pageCount)) || Math.abs(pageNumber - activePage) < 2 || pageNumber == pageCount || pageNumber == 1" >
          <div @click="changePage(pageNumber)" class="item pointer" :class="{[activeClasses]: activePage === pageNumber, last: (pageNumber == pageCount && Math.abs(pageNumber - activePage) > 2 && pageCount != 4), first:(pageNumber == 1 && Math.abs(pageNumber - activePage) > 2 && pageCount != 4)}">{{ pageNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  data () {
    return {
      activePage: 1,
      activeClasses: 'active',
      pageSize: 24,
      pageCount: 0,
      routerChoice: {
        'Stores': 'Stores-page'
      }
    }
  },
  methods: {
    changePage (newPage) {
      let currentRoute = this.$route.name
      currentRoute = this.routerChoice[currentRoute] ? this.routerChoice[currentRoute] : currentRoute
      let params = this.$route.params
      let store = this.$route.query.store
      if (newPage !== this.activePage) {
        params.page = newPage
        this.activePage = Number(newPage)
        this.$router.push({name: currentRoute, params: params})
        if (store) {
          this.$router.push({ path: `${this.$route.path}?store=${store}` })
        }
      }
    },
    getPageCount () {
      this.pageCount = this.$parent.countProducts !== 0 ? Math.ceil(this.$parent.countProducts / this.pageSize) : 0
    },
    actualizationOfData () {
      this.$route.params.page ? this.activePage = Number(this.$route.params.page) : this.activePage = 1
      this.pageSize = this.$parent.pagination.perPage
      this.getPageCount()
    }
  },
  watch: {
    '$parent.countProducts': function () {
      this.actualizationOfData()
    },
    '$route.path': function () {
      this.actualizationOfData()
    }
  },
  created () {
    this.actualizationOfData()
  }
}
</script>
<style lang="scss" scoped>

  .pagination {
    padding-top: 30px;
    padding-bottom: 10px;
    font-weight: 700;
    .item {
      box-sizing: border-box;
      padding: 5px 13px;

      &.first {
        position: relative;
        margin-right: 27px;

        &:after {
          content: '...';
          display: block;
          position: absolute;
          right: -17px;
          bottom: 5px;
        }
      }

      &.last {
        position: relative;
        margin-left: 27px;
        &:before {
          content: '...';
          display: block;
          position: absolute;
          left: -17px;
          bottom: 5px;
        }
      }
    }
    .active {
      font-size: 16px;
      margin: 0 5px;
      background-color: #3ed1cd;
    }
  }
</style>
