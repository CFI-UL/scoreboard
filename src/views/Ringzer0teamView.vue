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
          className="ringzer0team-view__users-table"
          @row-click="onRowClick"
          :data="data"
          :extractKey="(user) => user.id"
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
import ApexCharts from 'apexcharts'
import { first } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
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
        'points',
        'challenges',
        'lastSolvedAt',
        'activePast7Days'
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
    ...mapGetters([
      'ringzer0teamUsers'
    ]),
    sortedUsers () {
      return [...this.filteredUsers].sort((a, b) => {
        if (a.ringzer0team.points < b.ringzer0team.points) return 1
        if (a.ringzer0team.points > b.ringzer0team.points) return -1
        return 0
      })
    },
    filteredUsers () {
      return this.ringzer0teamUsers
    },
    data () {
      return this.sortedUsers.map((user, index) => {
        const sortedChallenges = this.sortChallengesDesc(user.ringzer0team.challenges)
        let lastChallengeSolved = first(sortedChallenges)
        let lastSolvedAt = null
        let active = false
        if (lastChallengeSolved) {
          lastSolvedAt = moment(lastChallengeSolved.validationDate).format('YYYY-MM-DD')
          const activeMinimumDate = moment().subtract(7, 'days').startOf('day')
          active = moment(lastChallengeSolved.validationDate).isAfter(activeMinimumDate)
        }
        return {
          id: user.id,
          position: index + 1,
          name: user.name,
          username: user.ringzer0team.username,
          points: user.ringzer0team.points,
          challenges: user.ringzer0team.challenges.length,
          lastSolvedAt,
          activePast7Days: (active ? '🔥' : '')
        }
      })
    }
  },
  methods: {
    onRowClick (user) {
      this.$router.push({
        name: 'userPlatform',
        params: {
          id: user.id,
          platformId: 'ringzer0team'
        }
      })
    },
    sortChallengesDesc (challenges) {
      return challenges.sort((a, b) => {
        if (a.validationDate < b.validationDate) return 1
        if (a.validationDate > b.validationDate) return -1
        return 0
      })
    },
    createChart () {
      const listPoints = []
      const listUsernames = []
      this.sortedUsers.forEach((user) => {
        listPoints.push(user.ringzer0team.points)
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

  &__users-table {
    width: 100%;
  }
}
</style>
