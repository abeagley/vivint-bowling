import gql from 'graphql-tag'

/*
  This is just for demonstration only and Prisma is built to be like a GraphQL API in front of your database.
  This wouldn't be a safe operation in any kind of client facing app as you would be able to specify any nickname.
*/

export default {
  createGame: gql`
    mutation CreateGame($nickname: String) {
      createGame(data: {
        users: {
          connect: {
            nickname: $nickname
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
  `
}
