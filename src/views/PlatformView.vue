<template lang="html">
  <div class="platform-view">
    <template v-if="platform">
      <platform :platform="platform" :users="users"></platform>
    </template>
    <template v-else>
      <error-message>
        Platform not found.
      </error-message>
    </template>
  </div>
</template>

<script>
import Platform from '@/components/Platform'
import ErrorMessage from '@/components/ErrorMessage'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'platform-view',
  props: {
    platformId: {
      type: String,
      required: true
    }
  },
  components: {
    ErrorMessage,
    Platform
  },
  computed: {
    ...mapState([
      'users',
      'platforms'
    ]),
    ...mapGetters([
      'getPlatformById'
    ]),
    platform () {
      return this.getPlatformById(this.platformId)
    }
  }
}
</script>

<style lang="scss">
.platform-view {

}
</style>
