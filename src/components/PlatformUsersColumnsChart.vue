<template lang="html">
  <div class="platform-users-columns-chart">
    <div ref="chart"></div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import { first, last, has, get } from 'lodash'

export default {
  name: 'platform-users-columns-chart',
  props: {
    platform: {
      type: Object,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      chart: null
    }
  },
  computed: {
    filteredUsers () {
      return this.users.slice(0).filter((user) => {
        return has(user, this.platform.id)
      })
    },
    sortedUsers () {
      return this.filteredUsers.slice(0).sort((a, b) => {
        if (get(a, [this.platform.id, 'points']) < get(b, [this.platform.id, 'points'])) return 1
        if (get(a, [this.platform.id, 'points']) > get(b, [this.platform.id, 'points'])) return -1
        return 0
      })
    }
  },
  methods: {
    chartOptions () {
      const listPoints = []
      const listUsernames = []
      this.sortedUsers.forEach((user) => {
        listPoints.push(user[this.platform.id].points)
        listUsernames.push(user[this.platform.id].username)
      })
      return {
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
    },
    updateChart () {
      const options = this.chartOptions()
      this.chart.updateOptions(options)
    },
    createChart () {
      const options = this.chartOptions()
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
    filteredUsers () {
      this.updateChart()
    }
  }
}
</script>

<style lang="scss">
.platform-users-columns-chart {

}
</style>
