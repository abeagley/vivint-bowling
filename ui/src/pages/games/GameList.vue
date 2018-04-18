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
               title="Game List"/>
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
  },

  beforeCreate () {
    this.newGameSub = client.subscribe({
      query: GameSvc.createdGameSubscription
    })

    this.newGameSub.subscribe({
      next: this.handleNewGame,
      error: this.handleNewGameError
    })
  },

  beforeMount () {
    this.fetchGames()
  },

  methods: {
    ...mapActions([
      'createGame',
      'fetchGames'
    ]),

    ...mapMutations([
      'addGameToList'
    ]),

    handleCreateGame () {
      this.createGame(this.nickname)
    },

    handleNewGame (resp) {
      console.log(resp)
      this.addGameToList(resp.data.game.node)
    },

    handleNewGameError (err) {
      alert(`Error getting new game: ${err}`)
    }
  },

  data () {
    return {
      newGameSub: null,
      tableColumns: [
        {
          prop: 'id',
          label: 'Name'
        },
        {
          prop: 'users.length',
          label: 'Players'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
