import client from '@/client'
import GameSvc from '@/services/game'

const state = {
  creating: false,
  error: null,
  games: []
}

const actions = {
  createGame ({ commit }, nickname) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doCreateGame')

        const newGame = await client.mutate({
          mutation: GameSvc.createGame,
          variables: { nickname }
        }).then((resp) => resp.data.createGame)

        commit('doCreateGameSuccess', newGame)
        resolve(newGame)
      } catch (e) {
        commit('doCreateGameError', e.message)
        reject(new Error(e.message))
      }
    })
  }
}

const mutations = {
  doCreateGame (state) {
    state.creating = true
    state.error = null
  },

  doCreateGameError (state, error) {
    state.creating = false
    state.error = error
  },

  doCreateGameSuccess (state, game) {
    state.creating = false
    state.games = [ ...state.games, game ]
  }
}

export default {
  state,
  actions,
  mutations
}
