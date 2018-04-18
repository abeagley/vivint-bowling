import client from '@/client'
import GameSvc from '@/services/game'

const state = {
  creating: false,
  data: [],
  error: null,
  loading: false
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

        commit('doCreateGameSuccess')
        resolve(newGame)
      } catch (e) {
        commit('doCreateGameError', e.message)
        reject(new Error(e.message))
      }
    })
  },

  fetchGames ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doFetchGames')

        const games = await client.query({
          query: GameSvc.listGames,
          fetchPolicy: 'network-only'
        }).then((resp) => resp.data.games)

        commit('doFetchGamesSuccess', games)
        resolve(games)
      } catch (e) {
        commit('doFetchGamesError', e.message)
        reject(new Error(e.message))
      }
    })
  },

  joinGame ({ commit }, data) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doJoinGame')

        const game = await client.mutate({
          mutation: GameSvc.joinGame,
          variables: data // { nickname: String, gameId: ID! }
        }).then((resp) => resp.data.updateGame)

        commit('doJoinGameSuccess')
        resolve(game)
      } catch (e) {
        commit('doJoinGameError', e.message)
        reject(new Error(e.message))
      }
    })
  }
}

const mutations = {
  addGameToList (state, game) {
    state.data = [ ...state.data, game ]
  },

  doCreateGame (state) {
    state.creating = true
    state.error = null
  },

  doCreateGameError (state, error) {
    state.creating = false
    state.error = error
  },

  doCreateGameSuccess (state) {
    state.creating = false
  },

  doFetchGames (state) {
    state.loading = true
    state.error = null
  },

  doFetchGamesError (state, error) {
    state.loading = false
    state.error = error
  },

  doFetchGamesSuccess (state, games) {
    state.loading = false
    state.data = games
  },

  doJoinGame (state) {
    state.joining = true
    state.error = null
  },

  doJoinGameError (state, error) {
    state.joining = false
    state.error = error
  },

  doJoinGameSuccess (state, games) {
    state.joining = false
  },

  updateGameInList (state, game) {
    state.data = state.data.map((exGame) => (exGame.id === game.id) ? game : exGame)
  }
}

export default {
  state,
  actions,
  mutations
}
