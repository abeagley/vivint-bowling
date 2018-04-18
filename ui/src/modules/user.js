import client from '@/client'
import UserSvc from '@/services/user'

const nickname = localStorage.getItem('nickname')

const state = {
  error: null,
  loading: false,
  nickname: nickname || null
}

const actions = {
  validateNickname ({ commit }, nickname) {
    return new Promise(async (resolve, reject) => {
      try {
        commit('doSettingNickname')

        const existingUser = await client.query({
          query: UserSvc.checkForExistingUser,
          variables: { nickname },
          fetchPolicy: 'network-only'
        }).then((resp) => resp.data.user)

        if (existingUser !== null) {
          localStorage.setItem('nickname', existingUser.nickname)
          commit('doSettingNicknameSuccess', existingUser.nickname)
          return resolve(existingUser)
        }

        const newUser = await client.mutate({
          mutation: UserSvc.createUserWithNickname,
          variables: { nickname }
        }).then((resp) => resp.data.createUser)

        localStorage.setItem('nickname', newUser.nickname)
        commit('doSettingNicknameSuccess', newUser.nickname)
        resolve(newUser)
      } catch (e) {
        commit('doSettingNicknameFailed', e.message)
        reject(new Error(e.message))
      }
    })
  }
}

const mutations = {
  doSettingNickname (state) {
    state.error = null
    state.loading = true
  },

  doSettingNicknameFailed (state, error) {
    state.error = error
    state.loading = false
  },

  doSettingNicknameSuccess (state, nickname) {
    state.loading = false
    state.nickname = nickname
  }
}

export default {
  state,
  actions,
  mutations
}
