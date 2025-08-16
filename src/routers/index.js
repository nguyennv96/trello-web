import { createWebHistory, createRouter } from 'vue-router'

import LoginView from '@/views/login.vue'
import App from '@/App.vue'
import Signup from '@/views/signup.vue'
import Dashboard from '@/views/dashboard.vue'
import VerifyEmail from '@/views/verify-email.vue'
import HomeLayout from '@/layouts/home-layout.vue'
import { store } from '@/store/store'
import AuthLayout from '@/layouts/auth-layout.vue'
import Board from '@/views/board.vue'
const routes = [
  {
    path: '/',
    component: AuthLayout,
    redirect: '/login',
    children: [
      {
        name: 'Login',
        path: 'login',
        component: LoginView,
      },
      {
        name: 'Signup',
        path: 'signup',
        component: Signup,
      },
      {
        name: 'Verify',
        path: 'account/verification',
        component: VerifyEmail,
      },
    ],
  },
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: Dashboard,
      },
      {
        name: 'Boards',
        path: 'boards',
        component: Board,
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const whiteList = ['Login', 'Signup', 'Verify']
  const isAuthenticated = store.getters['user/isAuth']
  console.log(isAuthenticated)

  if (!whiteList.includes(to.name) && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (isAuthenticated && whiteList.includes(to.name)) {
    if (from.name) {
      next({ name: from.name })
    } else {
      next({ name: 'Dashboard' })
    }
  } else {
    next()
  }
})
