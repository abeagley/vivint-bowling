<template>
<div class="section">
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col text-right">
        <button class="btn btn-primary" @click="handleCreateGame">CREATE GAME</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Table :loading="loading"
               :table-columns="tableColumns"
               :table-data="games"
               title="Game List">
          <el-table-column :width="100"
                           label=" ">
            <template slot-scope="props">
              <button class="btn btn-small btn-info w-100" @click="handleGameAction(props.row)">
                {{getActionText(props.row)}}
              </button>
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
import GameSvc from '@/services/game'
import Table from '@/pages/layout/components/Table'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: { Table },

  computed: mapState({
    creating: state => state.games.creating,
    games: state => state.games.data,
    loading: state => state.games.loading,
    nickname: state => state.user.nickname
  }),

  beforeDestroy () {
    this.newGameSub.unsubscribe()
    this.updatedGameSub.unsubscribe()
  },

  beforeMount () {
    const newSub = client.subscribe({
      query: GameSvc.createdGameSubscription
    })

    const updateSub = client.subscribe({
      query: GameSvc.updatedGameSubscription
    })

    this.newGameSub = newSub.subscribe({
      next: this.handleNewGame,
      error: this.handleNewGameError
    })

    this.updatedGameSub = updateSub.subscribe({
      next: this.handleUpdatedGame,
      error: this.handleUpdatedGameError
    })
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.fetchGames())
  },

  data () {
    return {
      newGameSub: null,
      updatedGameSub: null,
      tableColumns: [
        {
          prop: 'id',
          label: 'ID'
        },
        {
          prop: 'users.length',
          label: 'Players'
        }
      ]
    }
  },

  methods: {
    ...mapActions([
      'createGame',
      'fetchGames',
      'joinGame'
    ]),

    ...mapMutations([
      'addGameToList',
      'updateGameInList'
    ]),

    getActionText (row) {
      return (row.users.find(user => user.nickname === this.nickname)) ? 'VIEW' : 'JOIN'
    },

    handleCreateGame () {
      this.createGame(this.nickname)
    },

    async handleGameAction (row) {
      try {
        // Not very efficient as we've already checked this once. Eventually this would be a computed property per row.
        if (this.getActionText(row) === 'VIEW') {
          return this.$router.push({ name: 'Game View', params: { id: row.id } })
        }

        await this.joinGame({ nickname: this.nickname, gameId: row.id })
        this.$router.push({ name: 'Game View', params: { id: row.id } })
        // Do add player
      } catch (e) {
        alert(`Error Joining/Viewing Game: ${e.message}`)
      }
    },

    handleNewGame (resp) {
      this.addGameToList(resp.data.game.node)
    },

    handleNewGameError (err) {
      alert(`Error Getting New Game: ${err}`)
    },

    handleUpdatedGame (resp) {
      console.log(resp)
      this.updateGameInList(resp.data.game.node)
    },

    handleUpdatedGameError (err) {
      alert(`Error Updating Game: ${err}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
