import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import Ringzer0TeamView from '@/views/Ringzer0teamView'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/ringzer0team',
      component: MainView
    },
    {
      path: '/ringzer0team',
      name: 'ringzer0team',
      component: Ringzer0TeamView
    }
  ]
})

export default router
