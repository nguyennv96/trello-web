import { createWebHistory, createRouter } from 'vue-router'

import LoginView from '@/views/login.vue'
import App from '@/App.vue'
import Signup from '@/views/signup.vue'
import Dashboard from '@/views/dashboard.vue'
import VerifyEmail from '@/views/verify-email.vue'
import { store } from '@/store/store'
const routes = [
  {
    path: '/',
    component: App,
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
      {
        name: 'Dashboard',
        path: 'dashboard',
        component: Dashboard,
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
