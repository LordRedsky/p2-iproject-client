import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardCharacters from '../views/card-characters.vue'
import Comics from '../views/comicsBook.vue'
import DetailCharacter from '../views/datailCardCharacter.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Gifs from '../views/GIF.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CardCharacters
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/comics',
      name: 'comics',
      component: Comics
    },
    {
      path: '/gifs',
      name: 'gifs',
      component: Gifs
    },
    {
      path: '/detail-character/:id',
      name: 'detail',
      component: DetailCharacter
    }
  ]
})
//! NAVGUARD
router.beforeEach((to, from, next) => {
  const cekToken = localStorage.getItem("access_token")
  if (cekToken && to.name === 'login' || to.name === 'register') {
    next({ name: 'home' })
  } else if (!cekToken && to.name === 'home') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
