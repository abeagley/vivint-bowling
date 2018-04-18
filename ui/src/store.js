import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import games from './modules/games'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    user
  }
})
