<template>
  <div class="user-platform-profile">
    <user-platform-card
      :user="user"
      :userPlatformProfile="userPlatformProfile"
      :platform="platform"
      :activePastNumberDays="7"/>
    <user-platform-line-chart
      :user="user"
      :userPlatformProfile="userPlatformProfile"
      :platform="platform"
      :activePastNumberDays="7"/>
    <user-platform-challenges
      :user="user"
      :userPlatformProfile="userPlatformProfile"
      :platform="platform"
      :activePastNumberDays="7"/>
  </div>
</template>

<script>
import UserPlatformCard from '@/components/UserPlatformCard'
import UserPlatformLineChart from '@/components/UserPlatformLineChart'
import UserPlatformChallenges from '@/components/UserPlatformChallenges'

export default {
  name: 'user-platform-profile',
  components: {
    UserPlatformCard,
    UserPlatformLineChart,
    UserPlatformChallenges
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
  }
}
</script>

<style lang="scss">
.user-platform-profile {
}
</style>
