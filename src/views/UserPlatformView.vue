<template>
  <div class="user-platform-view">
    <template v-if="platform">
      <user-platform-profile
        :user="user"
        :userPlatformProfile="userPlatformProfile"
        :platform="platform"/>
    </template>
    <template v-else>
      <error-message>
        Platform not found.
      </error-message>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import ErrorMessage from '@/components/ErrorMessage'
import UserPlatformProfile from '@/components/UserPlatformProfile'

export default {
  name: 'user-platform-view',
  components: {
    ErrorMessage,
    UserPlatformProfile
  },
  props: {
    id: {
      type: String,
      required: true
    },
    platformId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      'users',
      'platforms'
    ]),
    ...mapGetters([
      'getUserById',
      'getPlatformById'
    ]),
    user () {
      return this.getUserById(this.id)
    },
    userPlatformProfile () {
      return get(this.user, this.platform.id, {})
    },
    platform () {
      return this.getPlatformById(this.platformId)
    }
  }
}
</script>

<style lang="scss">
.user-platform-view {

}
</style>
