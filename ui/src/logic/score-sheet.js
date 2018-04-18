import Score from './score'

export default class ScoreSheet {
  constructor (scoreSheetData) {
    if (!scoreSheetData) {
      throw new Error('Data for a score sheet is required')
    }

    this.user = scoreSheetData.user
    this.scores = this._fillNodes(scoreSheetData.scores)
  }

  updateNode (node) {

  }

  _fillNodes (existing) {
    let data = []

    if (existing.length > 0) {
      data = existing.map((score, idx) => {
        this[`node${score.round}`] = new Score(score)
      })
    }

    const iterations = 10 - data.length

    for (let i = (iterations === 10 ? 1 : data.length); i <= iterations; i++) {
      data.push(new Score({
        attemptOne: null,
        attemptTwo: null,
        finalAttempt: null,
        id: null,
        round: i
      }))
    }

    console.log(data)

    return data
  }
}
