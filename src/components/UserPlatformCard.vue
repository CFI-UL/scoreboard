<template lang="html">
  <div class="user-platform-card">
    <h2>{{ platform.name }}</h2>
    <div class="user-platform-card__info">
      <a :href="userPlatformProfile.url">{{ userPlatformProfile.username }}</a>
    </div>
    <div class="user-platform-card__info">
      Points: {{ userPlatformProfile.points }}
    </div>
    <div class="user-platform-card__info">
      Challenges: {{ sortedChallengesDesc.length }}
    </div>
    <div class="user-platform-card__info">
      First solve: {{ firstChallengeSolvedDate | formatDate }} ({{ firstChallengeSolvedDate | formatDateFromNow }})
    </div>
    <div class="user-platform-card__info">
      Last solve: {{ lastChallengeSolvedDate | formatDate }} ({{ lastChallengeSolvedDate | formatDateFromNow }})
    </div>
    <div class="user-platform-card__info" v-if="isActivePastNumberDays">
      Active past {{activePastNumberDays}} days 🔥
    </div>
  </div>
</template>

<script>
import { first, last, get } from 'lodash'
import moment from 'moment'

export default {
  name: 'user-platform-card',
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
    },
    activePastNumberDays: {
      type: Number,
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
    },
    firstChallengeSolved () {
      return last(this.sortedChallengesDesc)
    },
    firstChallengeSolvedDate () {
      return this.firstChallengeSolved.validationDate
    },
    lastChallengeSolved () {
      return first(this.sortedChallengesDesc)
    },
    lastChallengeSolvedDate () {
      return this.lastChallengeSolved.validationDate
    },
    isActivePastNumberDays () {
      if (this.lastChallengeSolved) {
        return this.isInLastDays(this.lastChallengeSolvedDate, this.activePastNumberDays)
      }
    }
  },
  methods: {
    isInLastDays (date, numberDays) {
      const activeMinimumDate = moment().subtract(numberDays, 'days').startOf('day')
      return moment(date).isAfter(activeMinimumDate)
    }
  },
  filters: {
    formatDate (value, format = 'MMMM Do YYYY') {
      return moment(value).format(format)
    },
    formatDateFromNow (value) {
      return moment(value).fromNow()
    }
  }
}
</script>

<style lang="scss">
.user-platform-card {

  &__info {
    margin: 0.15rem 0;
  }
}
</style>
