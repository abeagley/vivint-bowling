<template>
  <div class="section scoring">
    <div class="container-fluid">
      <div class="row">
        <div class="col" v-if="!loading">
          <Table :loading="false"
                 :table-columns="tableColumns"
                 :table-data="scoreSheets"
                 title="Game View">
            <el-table-column v-for="(_, idx) in new Array(10)"
                             :key="idx"
                             :label="`${idx + 1}`">
              <template slot-scope="props">
                <score-item :score-index="idx" :score-sheet="props.row"></score-item>
              </template>
            </el-table-column>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreItem from './components/ScoreItem'
import ScoreSheet from '@/logic/score-sheet'
import { mapState, mapActions } from 'vuex'
import Table from '@/pages/layout/components/Table'

export default {
  components: { ScoreItem, Table },

  computed: {
    ...mapState({
      error: state => state.game.error,
      game: state => state.game.data,
      loading: state => state.game.loading,
      routeParams: state => state.route.params
    }),

    scoreSheets () {
      if (this.loading || this.game === null) {
        return []
      }

      const data = this.game.scoreSheets.map((sheet) => {
        return new ScoreSheet(sheet)
      })

      console.log(data)

      return data
    }

  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.fetchGame(vm.routeParams.id))
  },

  data () {
    return {
      tableColumns: [{
        label: 'Name',
        prop: 'user.nickname'
      }]
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
