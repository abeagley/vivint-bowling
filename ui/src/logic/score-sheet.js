import Score from './score'

export default class ScoreSheet {
  constructor (scoreSheetData) {
    if (!scoreSheetData) {
      throw new Error('Data for a score sheet is required')
    }

    this.user = scoreSheetData.user
    this.id = scoreSheetData.id
    this.scores = this._fillNodes(scoreSheetData.scores)
  }

  updateNode (node) {

  }

  _fillNodes (existing) {
    let data = []

    if (existing.length > 0) {
      data = existing.map((score) => {
        return new Score(score)
      })
    }

    for (let i = (data.length + 1); i <= 10; i++) {
      data.push(new Score({
        attemptOne: null,
        attemptTwo: null,
        finalAttempt: null,
        id: null,
        round: i
      }))
    }

    return data
  }
}
