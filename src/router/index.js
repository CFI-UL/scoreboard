import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import PlatformsView from '@/views/PlatformsView'
import PlatformView from '@/views/PlatformView'
import UserView from '@/views/UserView'
import UserProfileView from '@/views/UserProfileView'
import UserPlatformView from '@/views/UserPlatformView'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/platforms',
      component: MainView
    },
    {
      path: '/platforms',
      name: 'platforms',
      component: PlatformsView
    },
    {
      path: '/platforms/:platformId',
      name: 'platform',
      props: true,
      component: PlatformView
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
