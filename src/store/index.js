import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/../data/users.json'
import { has } from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users
  },
  getters: {
    ringzer0teamUsers (state) {
      return state.users.filter(user => has(user, 'ringzer0team.username'))
    },
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    }
  }
})

export default store
