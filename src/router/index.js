import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import CurrentReport from '../views/details/details.vue'
import Care from '../views/care/care.vue'
import Settings from '../views/settings/settings.vue'
import HelloWorld from '@/main.vue'
import notFound from '@/components/shared/notFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/current-report',
    query: {
      name:'country'
    },
    name: 'current-report',
    component: CurrentReport
  },
  {
    path: '/care',
    name: 'Care',
    component: Care
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/algo',
    name: 'HelloWorld',
    component: HelloWorld
  },
  { path: '/404', component: notFound },  
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
