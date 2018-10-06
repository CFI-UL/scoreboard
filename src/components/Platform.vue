<template>
  <div class="platform">
    <platform-card :platform="platform" />
    <div class="platform__content">
      <h3>Players</h3>
      <platform-users-columns-chart :platform="platform" :users="users"/>
      <platform-users :platform="platform" :users="users"/>
    </div>
  </div>
</template>

<script>
import PlatformCard from '@/components/PlatformCard'
import PlatformUsers from '@/components/PlatformUsers'
import PlatformUsersColumnsChart from '@/components/PlatformUsersColumnsChart'

export default {
  name: 'platform',
  components: {
    PlatformCard,
    PlatformUsers,
    PlatformUsersColumnsChart
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
  }
}
</script>

<style lang="scss">
.platform {

}
</style>
