import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import game from './modules/game'
import games from './modules/games'
import scoreSheets from './modules/score-sheets'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    games,
    scoreSheets,
    user
  }
})
