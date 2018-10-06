<template lang="html">
  <div class="user-platform-challenges">
    <h4>Challenges ({{ this.filteredChallenges.length }})</h4>
    <input
      class="user-platform-challenges__search-input"
      type='text'
      placeholder="Filter"
      v-model="search"/>
    <data-table
      className="user-platform-challenges__challenges-table"
      :data="data"
      :extractKey="(data) => data.name"
      :columns="columns"
      :filter-key="filterKey"
      :initial-sort-key="initialSortKey"
      :initial-sort-key-order="initialSortKeyOrder">
    </data-table>
    <div class="user-platform-challenges__placeholder" v-if="sortedChallengesDesc.length === 0">
      No solve yet!
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
import moment from 'moment'
import DataTable from '@/components/DataTable'

export default {
  name: 'user-platform-challenges',
  props: {
    userPlatformProfile: {
      type: Object,
      required: true
    },
    platform: {
      type: Object,
      required: true
    },
    activePastNumberDays: {
      type: Number,
      required: true
    }
  },
  components: {
    DataTable
  },
  data: function () {
    return {
      chart: null,
      search: '',
      columns: [
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
    sortedChallengesDesc () {
      return this.userPlatformProfile.challenges.slice(0).sort((a, b) => {
        if (a.validationDate < b.validationDate) return 1
        if (a.validationDate > b.validationDate) return -1
        return 0
      })
    },
    filteredChallenges () {
      if (isEmpty(this.search)) return this.sortedChallengesDesc
      const search = this.search.toLowerCase()
      return this.sortedChallengesDesc.filter((challenge) => {
        return this.columns.some((column) => {
          return includes(String(challenge[column]).toLowerCase(), search)
        })
      })
    },
    data () {
      return this.filteredChallenges.map((challenge) => {
        const isActive = this.isInLastDays(challenge.validationDate, this.activePastNumberDays)
        let validationDate = moment(challenge.validationDate).format('YYYY-MM-DD')
        if (isActive) validationDate += ' 🔥'
        return Object.assign({}, challenge, { validationDate })
      })
    }
  },
  methods: {
    isInLastDays (date, numberDays) {
      const activeMinimumDate = moment().subtract(numberDays, 'days').startOf('day')
      return moment(date).isAfter(activeMinimumDate)
    }
  }
}
</script>

<style lang="scss">
.user-platform-challenges {

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
