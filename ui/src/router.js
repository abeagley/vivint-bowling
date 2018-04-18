import Vue from 'vue'
import Router from 'vue-router'

// Containers
import AppLayout from './pages/layout/AppLayout'
import GameList from './pages/games/GameList'
import GameView from './pages/games/GameView'
import SetNickname from './pages/users/SetNickname'

Vue.use(Router)

export const validateUser = (_to, _from, next) => (localStorage.getItem('nickname')) ? next() : next('/')

export default new Router({
  linkActiveClass: 'active',
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
          component: GameList,
          name: 'Game List'
        },
        {
          path: 'games/:id',
          component: GameView,
          name: 'Game View'
        }
      ]
    }
  ]
})
