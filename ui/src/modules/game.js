import client from '@/client'
import GameSvc from '@/services/game'

const state = {
  data: null,
  error: null,
  loading: true
}

const actions = {
  fetchGame ({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doFetchGame')

        const game = await client.query({
          query: GameSvc.fetchGame,
          variables: { id },
          fetchPolicy: 'network-only'
        }).then((resp) => resp.data.game)

        commit('doFetchGameSuccess', game)
        resolve(game)
      } catch (e) {
        commit('doFetchGameFailed', e.message)
        reject(new Error(e.message))
      }
    })
  }
}

const mutations = {
  doFetchGame (state) {
    state.error = null
    state.loading = true
  },

  doFetchGameFailed (state, error) {
    state.error = error
    state.loading = false
  },

  doFetchGameSuccess (state, game) {
    state.data = game
    state.loading = false
  }
}

export default {
  state,
  actions,
  mutations
}
