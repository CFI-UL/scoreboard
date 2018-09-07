import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import Ringzer0teamView from '@/views/Ringzer0teamView'
import UserView from '@/views/UserView'

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
      component: Ringzer0teamView
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView,
      props: true
    }
  ]
})

export default router
