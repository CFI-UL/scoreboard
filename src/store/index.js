import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/../data/users.json'
import platforms from '@/../data/platforms.json'
import { has } from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users,
    platforms
  },
  getters: {
    ringzer0teamUsers (state) {
      return state.users.filter(user => has(user, 'ringzer0team.username'))
    },
    rootMeUsers (state) {
      return state.users.filter(user => has(user, 'rootMe.url'))
    },
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    getPlatformById: (state) => (platformId) => {
      return state.platforms.find(platform => platform.id === platformId)
    }
  }
})

export default store
