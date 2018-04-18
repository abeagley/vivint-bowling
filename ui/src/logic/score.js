export default class Score {
  constructor (params = {
    attemptOne: 0,
    attemptTwo: 0,
    finalAttempt: 0,
    id: null,
    round: 0
  }) {
    if (params.round === 0) {
      throw new Error('Round must at least be initialized')
    }

    this.attemptOne = params.attemptOne
    this.attemptTwo = params.attemptTwo
    this.finalAttempt = params.finalAttempt
    this.id = params.id
    this.round = params.round
  }
}
