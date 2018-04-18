<template>
  <div class="section">
    <div class="container-fluid">
      <div class="row">
        <div class="col" v-if="!loading">
          <Table :loading="false"
                 :table-columns="tableColumns"
                 :table-data="game.scoreSheets"
                 title="Game View"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Table from '@/pages/layout/components/Table'

export default {
  components: { Table },

  computed: mapState({
    error: state => state.game.error,
    game: state => state.game.data,
    loading: state => state.game.loading,
    routeParams: state => state.route.params
  }),

  beforeRouteEnter (to, from, next) {
    next(vm => vm.fetchGame(vm.routeParams.id))
  },

  data () {
    let tableColumns = [{
      label: 'Name',
      prop: 'user.nickname'
    }]

    for (let i = 1; i <= 10; i++) {
      tableColumns.push({ label: i.toString() })
    }

    return {
      tableColumns
    }
  },

  methods: {
    ...mapActions([
      'fetchGame'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
