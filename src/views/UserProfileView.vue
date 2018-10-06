<template>
  <div class="user-profile-view">
    <h2>Profile</h2>
    <div>
      <h3>Platforms</h3>
      <ul>
        <li
          v-for="platform in platforms"
          :key="platform.id"
          v-if="userHasPlatform(platform)">
          <router-link :to="userPlatformRoute(platform)">
            {{ platform.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { has } from 'lodash'

export default {
  name: 'user-profile-view',
  props: {
    id: {
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
      'getUserById'
    ]),
    user () {
      return this.getUserById(this.id)
    }
  },
  methods: {
    userHasPlatform (platform) {
      return has(this.user, platform.id)
    },
    userPlatformRoute (platform) {
      return {
        name: 'userPlatform',
        params: {
          id: this.user.id,
          platformId: platform.id
        }
      }
    }
  }
}
</script>

<style lang="scss">
.user-profile-view {

}
</style>
