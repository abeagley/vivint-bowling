import Score from './score'

export default class ScoreSheet {
  constructor (scoreSheetData) {
    if (!scoreSheetData) {
      throw new Error('Data for a score sheet is required')
    }

    this.user = scoreSheetData.user
    this.id = scoreSheetData.id
    this.scores = this._fillNodes(scoreSheetData.scores)
    this.scoreResults = this._scoreSheet()
  }

  _scoreSheet () {
    let runningTotal = 0

    return this.scores.map((score, idx) => {
      const a1 = score.attemptOne || 0
      const a2 = score.attemptTwo || 0
      const a3 = score.finalAttempt || 0

      const next = (idx < this.scores.length) ? this.scores[idx + 1] : null

      // Current frame
      if (a1 === 10) {
        // Strike
        runningTotal += 10
        if (next && next.attemptOne) {
          runningTotal += (10 + next.attemptOne + next.attemptTwo)
        }
      } else if (a1 + a2 === 10) {
        runningTotal += 10
        if (next && next.attemptOne) {
          runningTotal += (10 + next.attemptOne)
        }
      } else {
        // No dice
        runningTotal += a1 + a2
      }

      // Last frame
      if (!next) {
        runningTotal += a3
      }

      return runningTotal
    })
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
        attemptOne: 0,
        attemptTwo: 0,
        finalAttempt: 0,
        id: null,
        round: i
      }))
    }

    return data
  }
}
