<template lang="html">
  <div class="user-platform-line-chart">
    <h3>Timeline</h3>
    <div ref="chart"></div>
  </div>
</template>

<script>
import { get, has, first, last, keys, isEmpty, includes } from 'lodash'
import moment from 'moment'
import ApexCharts from 'apexcharts'

export default {
  name: 'user-platform-line-chart',
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
  computed: {
    sortedChallengesDesc () {
      return this.userPlatformProfile.challenges.sort((a, b) => {
        if (a.validationDate < b.validationDate) return 1
        if (a.validationDate > b.validationDate) return -1
        return 0
      })
    }
  },
  methods: {
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
    },
    chartSeries () {
      const series = []
      const data = []
      let currentPoints = get(this.userPlatformProfile, 'points', 0)
      // Add current points now.
      data.push({
        x: moment().format(),
        y: currentPoints
      })
      // Add points when challenges was validate.
      this.sortedChallengesDesc.forEach((challenge) => {
        data.push({
          x: moment(challenge.validationDate).format(),
          y: currentPoints
        })
        // Update points.
        currentPoints -= challenge.points
      })
      // Add serie.
      series.push({
        name: this.platform.name,
        data
      })
      return series
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
    }
  }
}
</script>

<style lang="scss">
.user-platform-line-chart {

}
</style>
