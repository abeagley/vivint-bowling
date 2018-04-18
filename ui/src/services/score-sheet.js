import gql from 'graphql-tag'

export default {
  createScore: gql`
    mutation CreateScore($attemptOne: Int, $attemptTwo: Int, $finalAttempt: Int, $round: Int!, $scoreSheetId: ID!) {
      createScore(data: {
        attemptOne: $attemptOne
        attemptTwo: $attemptTwo
        finalAttempt: $finalAttempt
        round: $round
        scoreSheet: {
          connect: {
            id: $scoreSheetId
          }
        }
      }) {
        attemptOne
        attemptTwo
        finalAttempt
        id
        round
      }
    }
  `,

  updateScore: gql`
    mutation UpdateScore($attemptOne: Int, $attemptTwo: Int, $finalAttempt: Int, $id: ID!) {
      updateScore(where: {
        id: $id
      }, data: {
        attemptOne: $attemptOne
        attemptTwo: $attemptTwo
        finalAttempt: $finalAttempt
      }) {
        attemptOne
        attemptTwo
        finalAttempt
        id
        round
      }
    }
  `,

  // This is a really expensive subscription - a custom one would be much better on-top of the Prisma API
  subscribeToScoreUpdates: gql`
    subscription {
      score(where: {
        mutation_in: [CREATED, UPDATED]
      }) {
        node {
          attemptOne
          attemptTwo
          finalAttempt
          id
          round
          scoreSheet {
            id
            game {
              id
            }
          }
        }
      }
    }
  `
}
