<template>
<div class="section">
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col text-right">
        <button class="btn btn-primary">CREATE GAME</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Table :loading="false"
               :table-columns="tableColumns"
               :table-data="[]"
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

export default {
  components: { Table },

  beforeMount () {
    this.subscription = client.subscribe({
      subscription: GameSvc.createdGameSubscription
    }).subscribe({
      next: this.handleNewGame,
      error: this.handleNewGameError
    })
  },

  methods: {
    handleNewGame (game) {
      console.log('NEW GAME', game)
    },

    handleNewGameError (err) {
      console.log('NEW GAME ERROR', err)
    }
  },

  data () {
    return {
      subscription: null,
      tableColumns: [
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'url',
          label: 'Url'
        },
        {
          prop: 'createdAt',
          label: 'Created'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
