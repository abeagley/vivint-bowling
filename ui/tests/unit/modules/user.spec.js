import module from '@/modules/user'
import client from '@/client'

describe('Vuex: User Module', () => {
  it (`State: should default nickname to null`, () => {
    expect(module.state.nickname).toEqual(null)
  })

  it ('Mutation #setNickname: Should commit an action to set a nickname', () => {
    const state = { nickname: null }
    module.mutations.setNickname(state, 'Joe')
    expect(state.nickname).toEqual('Joe')
  })

  it ('Action #validateNickname: Should return an existing user', () => {
    let commit = jest.fn()
    const existingUser = {
      id: 'abc123',
      nickname: 'Joe'
    }

    client.query.mockResolvedValueOnce({
      data: {
        user: existingUser
      }
    })

    expect(module.actions.validateNickname({ commit }, 'Joe')).resolves.toBe(existingUser)
  })

  it (`Action #validateNickname: Should create a user with nickname if doesn't exist`, () => {
    let commit = jest.fn()
    const nickname = 'New'
    const newUserResp = {
      data: {
        createUser: {
          id: 'abc124',
          nickname
        }
      }
    }

    client.query.mockResolvedValueOnce({
      data: {
        user: null
      }
    })

    client.mutate.mockResolvedValueOnce(newUserResp)

    expect(module.actions.validateNickname({ commit }, nickname)).resolves.toBe(newUserResp)
  })
})
