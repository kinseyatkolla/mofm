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
  ],
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (e.g., browser back button), use it
    if (savedPosition) {
      return savedPosition
    }
    // Otherwise, scroll to top
    return { top: 0, behavior: 'smooth' }
  }
})

export default router

