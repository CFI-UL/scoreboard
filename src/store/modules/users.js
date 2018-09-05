import * as api from '../../api/users-api'

export default {
  namespaced: true,
  state: {
    users: [],
    usersError: null,
    usersIsFetching: false
  },
  mutations: {
    setUsers (state, users) {
      state.users = users
    },
    setUsersIsFetching (state, usersIsFetching) {
      state.usersIsFetching = usersIsFetching
    },
    setUsersError (state, usersError) {
      state.usersError = usersError
    }
  },
  actions: {
    fetchUsers ({ commit }) {
      commit('setUsers', [])
      commit('setUsersError', null)
      commit('setUsersIsFetching', true)
      return api.fetchUsers()
        .then(response => response.data)
        .then((users) => {
          commit('setUsers', users)
          commit('setUsersIsFetching', false)
          return users
        })
        .catch((error) => {
          commit('setUsersError', error)
          commit('setUsersIsFetching', false)
        })
    }
  }
}
