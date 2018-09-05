<template>
  <div id="app">
    <h1>CFI Scoreboard</h1>
    <spinner v-if="usersIsFetching"></spinner>
    <div class="users">
      <user
        v-for="(user, index) in sortedUsers"
        :key="user.name"
        :index="index"
        :user="user">
      </user>
    </div>
  </div>
</template>

<script>
import Spinner from './components/Spinner.vue'
import User from './components/User.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',

  components: {
    Spinner,
    User
  },

  computed: {
    ...mapState('users', [
      'users',
      'usersIsFetching',
      'usersError'
    ]),
    sortedUsers () {
      return this.users.sort((a, b) => {
        if (a.ringzer0team.points < b.ringzer0team.points) return 1
        if (a.ringzer0team.points > b.ringzer0team.points) return -1
        return 0
      })
    }
  },

  methods: mapActions('users', [
    'fetchUsers'
  ]),

  mounted () {
    this.fetchUsers()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 900px;
  margin: 0 auto;
}
</style>
