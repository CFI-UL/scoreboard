import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/../data/users.json'
import ringzer0teamProfiles from '@/../data/ringzer0team/profiles.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users,
    ringzer0teamProfiles
  }
})

export default store
