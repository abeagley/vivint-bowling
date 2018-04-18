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
import client from '@/client'
import ScoreSheetSvc from '@/services/score-sheet'
import ScoreItem from './components/ScoreItem'
import { mapState, mapActions, mapMutations } from 'vuex'
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

  beforeMount () {
    const changeSub = client.subscribe({
      query: ScoreSheetSvc.subscribeToScoreUpdates
    })

    this.scoreChanges = changeSub.subscribe({
      next: this.handleScoreChange,
      error: this.handleScoreChangeError
    })
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.fetchGame(vm.routeParams.id))
  },

  data () {
    return {
      scoreChanges: null,
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

    ...mapMutations([
      'doCreateUpdateScoreSuccess'
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
    },

    handleScoreChange (resp) {
      const score = resp.data.score.node
      const scoreSheetId = score.scoreSheet.id
      const gameId = score.scoreSheet.game.id

      if (gameId !== this.routeParams.id) {
        return
      }

      this.doCreateUpdateScoreSuccess({
        scoreSheet: { id: scoreSheetId },
        score: score
      })
    },

    handleScoreChangeError (e) {
      alert(`Error Updating/Creating Score Sub: ${e.message}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
