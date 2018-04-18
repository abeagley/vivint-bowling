import gql from 'graphql-tag'

export default {
  createScore: gql`
    mutation CreateScore($attemptOne: Int, $attemptTwo: Int, $finalAttempt: Int, $round: Int!, $scoreSheetId: ID!) {
      createScore(data: {
        attemptOne: $attemptOne
        attemptTwo: $attemptTwo
        finalAttempt: $finalAttempt
        round: $round
        scoreSheets: {
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
  `
}
