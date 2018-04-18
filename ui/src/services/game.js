import gql from 'graphql-tag'

/*
  This is just for demonstration only and Prisma is built to be like a GraphQL API in front of your database. This
  wouldn't be a safe operation in any kind of client facing app as you would be able to specify any nickname.

  We also don't get the benefit of custom resolvers by hitting the Prisma API directly so we lose all sorts of
  validation.
*/

export default {
  createGame: gql`
    mutation CreateGame($nickname: String) {
      createGame(data: {
        users: {
          connect: {
            nickname: $nickname
          }
        },
        scoreSheets: {
          create: {
            user: {
              connect: {
                nickname: $nickname
              }
            }
          }
        }
      }) {
        id
        users {
          id
        }
      }
    }
  `,

  createdGameSubscription: gql`
    subscription CreatedGameSub {
      game(where: {
        mutation_in: CREATED
      }) {
        node {
          id
          users {
            id
            nickname
          }
        }
      }
    }   
  `,

  fetchGame: gql`
    query FetchGame($id: ID!) {
      game(where: {
        id: $id
      }) {
        id
        scoreSheets {
          id
          scores(orderBy: round_ASC) {
            attemptOne
            attemptTwo
            finalAttempt
            id
            round
          }
          user {
            id
            nickname
          }
        }
      }
    }
  `,

  joinGame: gql`
    mutation JoinGame($nickname: String!, $gameId: ID!) {
      updateGame(where: {
        id: $gameId
      }, data: {
        scoreSheets: {
          create: {
            user: {
              connect: {
                nickname: $nickname
              }
            }
          }
        }
        users: {
          connect: {
            nickname: $nickname
          }
        }
      }) {
        id
      }
    }
  `,

  listGames: gql`
    {
      games {
        id
        users {
          id
          nickname
        }
      }
    }
  `,

  updatedGameSubscription: gql`
    subscription PlayerJoined {
      game(where: {
        mutation_in: UPDATED
      }) {
        node {
          id
          scoreSheets {
            id
            scores(orderBy: round_ASC) {
              attemptOne
              attemptTwo
              finalAttempt
              id
              round
            }
            user {
              id
              nickname
            }
          }
          users {
            id
            nickname
          }
        }
      }
    }
  `
}
