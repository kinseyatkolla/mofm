import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import FAQ from '../views/FAQ.vue'
import History from '../views/History.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/history',
      name: 'History',
      component: History
    }
  ]
})

export default router

