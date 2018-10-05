<template lang="html">
  <div class="user-platform-card">
    <h3>{{ platform.name }}</h3>
    <div class="user-platform-card__info">
      <a :href="userPlatformProfile.url">{{ userPlatformProfile.username }}</a>
    </div>
    <div class="user-platform-card__info">
      Points: {{ userPlatformProfile.points }}
    </div>
    <div class="user-platform-card__info">
      Challenges: {{ sortedChallengesDesc.length }}
    </div>
  </div>
</template>

<script>
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
    lastChallengeSolved () {
      return first(this.sortedChallengesDesc)
    },
  }
}
</script>

<style lang="scss">
.user-platform-card {

}
</style>
