<template>
  <div class="user-platform-profile">
    <user-platform-card
      :user="user"
      :userPlatformProfile="userPlatformProfile"
      :platform="platform"/>
  </div>
</template>

<script>
import { get, has, first, last, keys, isEmpty, includes } from 'lodash'
import UserPlatformCard from '@/components/UserPlatformCard'
import DataTable from '@/components/DataTable'
import moment from 'moment'
import ApexCharts from 'apexcharts'

export default {
  name: 'user-platform-profile',
  components: {
    UserPlatformCard,
    DataTable
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    userPlatformProfile: {
      type: Object,
      required: true
    },
    platform: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      chart: null,
      search: '',
      columns: [
        'platform',
        'name',
        'category',
        'validationDate',
        'points'
      ],
      filterKey: '',
      initialSortKey: 'validationDate',
      initialSortKeyOrder: -1
    }
  },
  computed: {
    hasRingzer0team () {
      return has(this.user, 'ringzer0team.username')
    },
    // Sort challenges by validationDate desc.
    sortedRingzer0teamChallenges () {
      return get(this.user, 'ringzer0team.challenges', []).sort((a, b) => {
        if (a.validationDate < b.validationDate) return 1
        if (a.validationDate > b.validationDate) return -1
        return 0
      })
    },
    firstChallengeSolved () {
      return last(this.sortedRingzer0teamChallenges)
    },
    ringzer0teamFirstSolveDate () {
      if (this.firstChallengeSolved) {
        return moment(this.firstChallengeSolved.validationDate).format('MMMM Do YYYY')
      }
    },
    ringzer0teamFirstSolveDateFromNow () {
      if (this.firstChallengeSolved) {
        return moment(this.firstChallengeSolved.validationDate).fromNow()
      }
    },
    lastChallengeSolved () {
      return first(this.sortedRingzer0teamChallenges)
    },
    ringzer0teamLastSolveDate () {
      if (this.lastChallengeSolved) {
        return moment(this.lastChallengeSolved.validationDate).format('MMMM Do YYYY')
      }
    },
    ringzer0teamLastSolveDateFromNow () {
      if (this.lastChallengeSolved) {
        return moment(this.lastChallengeSolved.validationDate).fromNow()
      }
    },
    data () {
      const challengesByPlatform = {
        'Ringzer0team': get(this.user, 'ringzer0team.challenges', [])
      }
      return keys(challengesByPlatform).reduce((challenges, platform) => {
        return challenges.concat(
          challengesByPlatform[platform].map((challenge) => {
            // Active?
            let validationDate = moment(challenge.validationDate)
            const activeMinimumDate = moment().subtract(7, 'days').startOf('day')
            const active = validationDate.isAfter(activeMinimumDate)

            validationDate = validationDate.format('YYYY-MM-DD')
            if (active) {
              validationDate += ' 🔥'
            }

            return {
              ...challenge,
              validationDate,
              platform
            }
          })
        )
      }, [])
    },
    filteredData () {
      if (isEmpty(this.search)) return this.data
      const search = this.search.toLowerCase()
      return this.data.filter((challenge) => {
        return this.columns.some((column) => {
          return includes(String(challenge[column]).toLowerCase(), search)
        })
      })
    },
    extractKey (challenge) {
      return challenge.platform + ' ' + challenge.name
    }
  },
  methods: {
    isInLast7Days (date) {
      const activeMinimumDate = moment().subtract(7, 'days').startOf('day')
      return moment(date).isAfter(activeMinimumDate)
    },
    chartSeries () {
      const series = []
      if (this.hasRingzer0team) {
        const ringzer0teamData = []
        let ringzer0teamCurrentPoints = get(this.user, 'ringzer0team.points', 0)
        // Add current points now.
        ringzer0teamData.push({
          x: moment().format(),
          y: ringzer0teamCurrentPoints
        })
        const ringzer0teamChallenges = this.sortedRingzer0teamChallenges
        // Add points when challenges was validate.
        ringzer0teamChallenges.forEach((challenge) => {
          ringzer0teamData.push({
            x: moment(challenge.validationDate).format(),
            y: ringzer0teamCurrentPoints
          })
          // Update points.
          ringzer0teamCurrentPoints -= challenge.points
        })
        // Add serie.
        series.push({
          name: 'Ringzer0team',
          data: ringzer0teamData
        })
      }
      return series
    },
    createChart () {
      const options = {
        chart: {
          type: 'line'
        },
        series: this.chartSeries(),
        xaxis: {
          type: 'datetime'
        },
        toolbar: {
          show: true
        }
      }
      this.chart = new ApexCharts(this.$refs.chart, options)
      this.chart.render()
    }
  },
  // mounted () {
  //   this.createChart()
  // },
  // beforeDestroy () {
  //   this.chart.destroy()
  // },
  // watch: {
  //   user () {
  //     this.updateChart()
  //   }
  // }
}
</script>

<style lang="scss">
.user-platform-profile {
  &__platform-name {
    font-size: 1.5em;
    margin: 0.3rem 0;
  }
  &__platform-username {
    margin: 0.3rem 0;
  }
  &__platform-info {
    margin: 0.15rem 0;
  }
  &__search-input {
    width: 200px;
    padding: 0.3rem .3rem;
    margin: 0.3rem 0;
  }
  &__challenges-table {
    width: 100%;
  }
  &__placeholder {
    margin: 1rem;
    text-align: center;
  }
}
</style>
