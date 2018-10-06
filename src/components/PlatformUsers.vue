<template lang="html">
  <div class="platform-users">
    <data-table
      className="platform-users__table"
      @row-click="onRowClick"
      :data="data"
      :extractKey="(data) => data.id"
      :columns="columns"
      :filter-key="filterKey"
      :initial-sort-key="initialSortKey"
      :initial-sort-key-order="initialSortKeyOrder">
    </data-table>
    <div class="platform-users__placeholder" v-if="sortedUsers.length === 0">
      No player yet.
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
import moment from 'moment'
import { first, last, has, get } from 'lodash'

export default {
  name: 'platform-users',
  components: {
    DataTable
  },
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
      columns: [
        'position',
        'name',
        'username',
        'points',
        'challenges',
        'lastSolvedAt'
      ],
      filterKey: '',
      initialSortKey: 'position',
      initialSortKeyOrder: 1
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
    onRowClick (data) {
      this.$router.push({
        name: 'userPlatform',
        params: {
          id: data.id,
          platformId: this.platform.id
        }
      })
    },
    sortChallengesDesc (challenges) {
      return challenges.sort((a, b) => {
        if (a.validationDate < b.validationDate) return 1
        if (a.validationDate > b.validationDate) return -1
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
.platform-users {

  &__table {
    width: 100%;
  }

  &__placeholder {
    margin: 1rem;
    text-align: center;
  }
}
</style>
