<template>
  <div class="user-platform-view">
    <template v-if="platform">
      <user-platform-profile
        :user="user"
        :userPlatformProfile="userPlatformProfile"
        :platform="platform"/>
    </template>
    <template v-else>
      <div class="user-platform-view__error">
        Platform not found.
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import UserPlatformProfile from '@/components/UserPlatformProfile'

export default {
  name: 'user-platform-view',
  components: {
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

  &__error {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    font-size: 1em;
    color: red;
  }
}
</style>
