import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import HomePage from '../pages/HomePage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/home', component: HomePage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
