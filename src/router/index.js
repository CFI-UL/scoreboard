import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import Ringzer0teamView from '@/views/Ringzer0teamView'
import RootMeView from '@/views/RootMeView'
import UserView from '@/views/UserView'
import UserProfileView from '@/views/UserProfileView'
import UserPlatformView from '@/views/UserPlatformView'

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
      path: '/root-me',
      name: 'rootMe',
      component: RootMeView
    },
    {
      path: '/users/:id',
      component: UserView,
      props: true,
      children: [
        {
          name: 'user',
          path: '/',
          props: true,
          component: UserProfileView
        },
        {
          name: 'userPlatform',
          path: 'platform/:platformId',
          props: true,
          component: UserPlatformView
        }
      ]
    }
  ]
})

export default router
