<template>
  <div class="ringzer0team-view">
    <platform
      :name="platform.name"
      :url="platform.url"
      :description="platform.description">
      <h3>Players</h3>
      <div ref="chart"></div>
      <div class="ringzer0team-view__users">
        <data-table
          :data="ringzer0teamUsers"
          :extractKey="(user) => user.username"
          :columns="columns"
          :filter-key="filterKey"
          :initial-sort-key="initialSortKey"
          :initial-sort-key-order="initialSortKeyOrder">
        </data-table>
      </div>
    </platform>
  </div>
</template>

<script>
import randomColor from 'randomcolor'
import ApexCharts from 'apexcharts'
import { has } from 'lodash'
import { mapState } from 'vuex'
import Platform from '@/components/Platform'
import Spinner from '@/components/Spinner'
import DataTable from '@/components/DataTable'

export default {
  name: 'ringzer0team-view',
  components: {
    Platform,
    Spinner,
    DataTable
  },
  data: function () {
    return {
      chart: null,
      platform: {
        name: 'Ringzer0team',
        url: 'https://ringzer0team.com/',
        description: [
          "RingZer0 Team's online CTF offers you tons of challenges designed to test and improve your hacking skills through hacking challenges. Register and get a flag for every challenge.",
          'Currently more than 200 challenges are available over 13 categories. Have fun resolving them.'
        ]
      },
      columns: [
        'position',
        'name',
        'username',
        'points'
      ],
      filterKey: '',
      initialSortKey: 'position',
      initialSortKeyOrder: 1
    }
  },
  computed: {
    ...mapState([
      'users'
    ]),
    sortedUsers () {
      return [...this.filteredUsers].sort((a, b) => {
        if (a.ringzer0team.points < b.ringzer0team.points) return 1
        if (a.ringzer0team.points > b.ringzer0team.points) return -1
        return 0
      })
    },
    filteredUsers () {
      return this.users.filter(user => has(user, 'ringzer0team.username'))
    },
    ringzer0teamUsers () {
      return this.sortedUsers.map((user, index) => {
        return {
          position: index + 1,
          name: user.name,
          username: user.ringzer0team.username,
          points: user.ringzer0team.points,
          color: this.userColor(user)
        }
      })
    }
  },
  methods: {
    userColor (user) {
      const seed = parseInt(2 * user.ringzer0team.id)
      return randomColor({ seed })
    },
    createChart () {
      const listPoints = []
      const listColors = []
      const listUsernames = []
      this.sortedUsers.forEach((user) => {
        listPoints.push(user.ringzer0team.points)
        listColors.push(this.userColor(user))
        listUsernames.push(user.ringzer0team.username)
      })
      const options = {
        chart: {
          type: 'bar'
        },
        series: [{
          name: 'points',
          data: listPoints
        }],
        xaxis: {
          categories: listUsernames
        },
        toolbar: {
          show: false
        }
      }
      this.chart = new ApexCharts(this.$refs.chart, options)
      this.chart.render()
    }
  },
  mounted () {
    this.createChart()
  },
  beforeDestroy () {
    this.chart.destroy()
  }
}
</script>

<style lang="scss">

.ringzer0team-view {
  &__users {
    padding: 1rem 0;
  }
}
</style>
