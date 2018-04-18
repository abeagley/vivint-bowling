import client from '@/client'
import ScoreSheetSvc from '@/services/score-sheet'
import ScoreSheet from '@/logic/score-sheet'

const state = {
  creating: false,
  data: null,
  error: null,
  updating: false
}

// Needs more typescript
const actions = {
  // { scoreSheet: Object, scoreIndex: Number, scoreData: Object }
  // Needs more typescript
  createScore ({ commit }, data) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doCreateScore')

        const score = await client.mutate({
          mutation: ScoreSheetSvc.createScore,
          variables: {
            ...data.scoreData,
            scoreSheetId: data.scoreSheet.id
          }
        })

        resolve(score)
      } catch (e) {
        commit('doCreateScoreFailed', e.message)
        reject(new Error(e.message))
      }
    })
  },

  // { scoreSheet: Object, scoreIndex: Number, scoreData: Object }
  updateScore ({ commit }, data) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doUpdateScore')

        const score = await client.mutate({
          mutation: ScoreSheetSvc.updateScore,
          variables: data.scoreData
        })

        resolve(score)
      } catch (e) {
        commit('doUpdateScoreFailed', e.message)
        reject(new Error(e.message))
      }
    })
  }
}

const mutations = {
  setSheets (state, data) {
    state.data = data.map((sheet) => {
      return new ScoreSheet(sheet)
    })
  },

  doCreateScore (state) {
    state.creating = true
    state.error = null
  },

  doCreateScoreFailed (state, error) {
    state.creating = false
    state.error = error
  },

  doUpdateScore (state) {
    state.error = null
    state.updating = true
  },

  doUpdateScoreFailed (state, error) {
    state.error = error
    state.updating = false
  },

  doCreateUpdateScoreSuccess (state, data) {
    state.creating = false
    state.data = state.data.map((sheet) => {
      if (sheet.id !== data.scoreSheet.id) {
        return sheet
      }

      return Object.assign({}, sheet, {
        scores: sheet.scores.map((score) => (score.round === data.score.round) ? data.score : score)
      })
    })
    state.updating = false
  }
}

export default {
  state,
  actions,
  mutations
}
