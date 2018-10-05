<template>
  <div class="rootMe-view">
    <platform
      :name="platform.name"
      :url="platform.url"
      :description="platform.description">
      <h3>Players</h3>
      <div ref="chart"></div>
      <div class="rootMe-view__users">
        <data-table
          className="rootMe-view__users-table"
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
  name: 'rootMe-view',
  components: {
    Platform,
    Spinner,
    DataTable
  },
  data: function () {
    return {
      chart: null,
      platform: {
        name: 'Root Me',
        url: 'https://www.root-me.org',
        description: [
          'Root Me allows everyone to test and improve their knowledge in computer security and hacking. Legal. Free. Realistic.',
          'Hundreds of challenges are available to train yourself in different and not simulated environments, offering you a way to learn a lot of hacking technics!'
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
      'rootMeUsers'
    ]),
    sortedUsers () {
      return [...this.filteredUsers].sort((a, b) => {
        if (a.rootMe.points < b.rootMe.points) return 1
        if (a.rootMe.points > b.rootMe.points) return -1
        return 0
      })
    },
    filteredUsers () {
      return this.rootMeUsers
    },
    data () {
      return this.sortedUsers.map((user, index) => {
        const sortedChallenges = this.sortChallengesDesc(user.rootMe.challenges)
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
          username: user.rootMe.username,
          points: user.rootMe.points,
          challenges: user.rootMe.challenges.length,
          lastSolvedAt,
          activePast7Days: (active ? '🔥' : '')
        }
      })
    }
  },
  methods: {
    onRowClick (user) {
      this.$router.push({
        name: 'user',
        params: { id: user.id }
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
        listPoints.push(user.rootMe.points)
        listUsernames.push(user.rootMe.username)
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

.rootMe-view {
  &__users {
    padding: 1rem 0;
  }

  &__users-table {
    width: 100%;
  }
}
</style>
