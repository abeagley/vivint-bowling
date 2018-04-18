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
                             :min-width="(idx === 9) ? 200 : 135"
                             :label="`${idx + 1}`">
              <template slot-scope="props">
                <score-item :on-update-score="handleUpdateScore" :score-index="idx"
                            :score-sheet="props.row"></score-item>
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
import { mapState, mapActions } from 'vuex'
import Table from '@/pages/layout/components/Table'

export default {
  components: { ScoreItem, Table },

  computed: mapState({
    error: state => state.game.error,
    game: state => state.game.data,
    loading: state => state.game.loading,
    routeParams: state => state.route.params,
    scoreSheets: state => state.scoreSheets.data
  }),

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
      'createScore',
      'fetchGame',
      'updateScore'
    ]),

    // Debounce this eventually
    async handleUpdateScore (scoreSheet, scoreIndex, scoreData) {
      try {
        const payload = { scoreSheet, scoreIndex, scoreData }

        if (scoreData.id === null) {
          await this.createScore(payload)
          return
        }

        await this.updateScore(payload)
      } catch (e) {
        alert(`Error Updating/Creating Score: ${e.message}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
