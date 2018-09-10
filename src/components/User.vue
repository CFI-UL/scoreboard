<template>
  <div class="user">
    <div class="user__info">
      <h2>{{ user.name }}</h2>
      <div v-if="hasRingzer0team">
        <div class="user__platform-name">Ringzer0team</div>
        <div class="user__platform-username">
          <a :href="user.ringzer0team.url">{{ user.ringzer0team.username }}</a>
        </div>
        <div class="user__platform-info">
          Points: {{ user.ringzer0team.points }}
        </div>
        <div class="user__platform-info">
          Challenges: {{ ringzer0teamProfile.challenges.length }}
        </div>
        <div class="user__platform-info">
          First solve: {{ ringzer0teamFirstSolveDate }} ({{ ringzer0teamFirstSolveDateFromNow }})
        </div>
        <div class="user__platform-info">
          Last solve: {{ ringzer0teamLastSolveDate }} ({{ ringzer0teamLastSolveDateFromNow }})
        </div>
        <div class="user__platform-info" v-if="isInLast7Days(lastChallengeSolved.validationDate)">
          Active past 7 days 🔥
        </div>
      </div>
    </div>
    <div class="user__content">
      <div>
        <h3>Timeline</h3>
        <div ref="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, has, isEmpty, first, last } from 'lodash'
import moment from 'moment'
import ApexCharts from 'apexcharts'

export default {
  name: 'user',
  props: {
    user: {
      type: Object,
      required: true
    },
    ringzer0teamProfile: {
      type: Object
    }
  },
  data: function () {
    return {
      chart: null
    }
  },
  computed: {
    hasRingzer0team () {
      return has(this.user, 'ringzer0team.username') && !isEmpty(this.ringzer0teamProfile)
    },
    // Sort challenges by validationDate desc.
    sortedRingzer0teamChallenges () {
      return get(this.ringzer0teamProfile, 'challenges', []).sort((a, b) => {
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
    }
  },
  methods: {
    isInLast7Days (date) {
      console.log('isInLast7Days', date);
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
  mounted () {
    this.createChart()
  },
  beforeDestroy () {
    this.chart.destroy()
  },
  watch: {
    user () {
      this.updateChart()
    },
    ringzer0teamProfile () {
      this.updateChart()
    }
  }
}
</script>

<style lang="scss">
.user {
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
}
</style>
