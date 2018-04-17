import Vue from 'vue'
import Router from 'vue-router'

// Containers
import AppLayout from './pages/layout/AppLayout'
import SetNickname from './pages/users/SetNickname'

Vue.use(Router)

export const validateUser = (_to, _from, next) => (localStorage.getItem('nickname')) ? next() : next('/')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Set Nickname',
      component: SetNickname
    },
    {
      path: '/app',
      component: AppLayout,
      beforeEnter: validateUser,
      children: [
        {
          path: '',
          redirectTo: { name: 'Game List' }
        },
        {
          path: 'games',
          name: 'Game List'
        }
      ]
    }
  ]
})
