import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DetalleLugar from '../views/DetalleLugar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lugar/:id',
    name: 'DetalleLugar',
    component: DetalleLugar,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router