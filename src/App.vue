<template>
  <div id="app">
    <h1>CFI Scoreboard</h1>
    <spinner v-if="usersIsFetching"></spinner>
    <canvas ref="chart" class="chart"></canvas>
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
import randomColor from 'randomcolor'
import Chart from 'chart.js'
import Spinner from './components/Spinner.vue'
import User from './components/User.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'app',

  components: {
    Spinner,
    User
  },

  data: function () {
    return {
      chart: null
    }
  },

  computed: {
    ...mapState('users', [
      'users',
      'usersIsFetching',
      'usersError'
    ]),
    sortedUsers () {
      return this.sortUsers(this.users)
    }
  },

  methods: {
    ...mapActions('users', [
      'fetchUsers'
    ]),

    sortUsers (users) {
      return users.sort((a, b) => {
        if (a.ringzer0team.points < b.ringzer0team.points) return 1
        if (a.ringzer0team.points > b.ringzer0team.points) return -1
        return 0
      })
    },

    createChart (users) {
      const sortedUsers = this.sortUsers(users)
      const context = this.$refs.chart
      const labels = sortedUsers.map(user => user.ringzer0team.username)
      const data = sortedUsers.map(user => user.ringzer0team.points)
      const backgroundColor = sortedUsers.map((user) => {
        const seed = parseInt(2 * user.ringzer0team.id)
        return randomColor({ seed })
      })
      this.chart = new Chart(context, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'points',
            data,
            backgroundColor
          }]
        },
        options: {
          legend: {
            display: false
          }
        }
      })
    }
  },

  mounted () {
    this.fetchUsers()
      .then((users) => {
        this.createChart(users)
      })
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
