import { createRouter, createWebHistory } from 'vue-router'

import MainPage from './pages/MainPage.vue'
import CostsPage from './pages/CostsPage.vue'
import IncomePage from './pages/IncomePage.vue'
import ReportPage from './pages/ReportPage.vue'
import EditUser from './pages/EditUser.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/costs-page', component: CostsPage },
    { path: '/income-page', component: IncomePage },
    { path: '/report-page', component: ReportPage },
    { path: '/edit-user', component: EditUser },
  ]
})

export default router