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
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/current-report',
    query: {
      name:'country'
    },
    name: 'current-report',
    component: CurrentReport,
    meta: {
      title: 'Current-report'
    }
  },
  {
    path: '/care',
    name: 'Care',
    component: Care,
    meta: {
      title: 'Care'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/algo',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {
      title: 'Card Chart'
    }
  },
  { path: '/404', component: notFound,    meta: {title: '404'} },  
  { path: '*', redirect: '/404' }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
