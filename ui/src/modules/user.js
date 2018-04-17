import client from '@/client'
import UserSvc from '@/services/user'

const nickname = localStorage.getItem('nickname')

const state = {
  loading: false,
  nickname: nickname || null
}

const actions = {
  validateNickname ({ commit }, nickname) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await client.query({
          query: UserSvc.checkForExistingUser,
          variables: { nickname }
        }).then((resp) => resp.data.user)

        console.log(existingUser)

        if (existingUser !== null) {
          localStorage.setItem('nickname', existingUser.nickname)
          commit('setNickname', existingUser.nickname)
          return resolve(existingUser)
        }

        // const newUser = await client.mutate({
        //   mutation: UserSvc.createUserWithNickname,
        //   variables: { nickname }
        // }).then((resp) => resp.data.createUser)
        //
        // localStorage.setItem('nickname', existingUser.nickname)
        // commit('setNickname', newUser)
        // resolve(newUser.data.user)
      } catch (e) {
        reject(new Error(e.message))
      }
    })
  }
}

const mutations = {
  setNickname (state, nickname) {
    state.nickname = nickname
  }
}

export default {
  state,
  actions,
  mutations
}
