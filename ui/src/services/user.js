import gql from 'graphql-tag'

export default {
  checkForExistingUser: gql`
    query GetUserByNickname($nickname: String!) {
      user(where: {
        nickname: $nickname
      }) {
        id
        nickname
      }
    }
  `,

  createUserWithNickname: gql`
    mutation CreateUserWithNickname($nickname: String!) {
      createUser(data: {
        nickname: $nickname
      }) {
        id
        nickname
      }
    }
  `
}
