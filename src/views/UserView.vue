<template>
  <div class="user-view">
    <template v-if="user">
      <user :user="user" :ringzer0team-profile="ringzer0teamProfile"></user>
    </template>
    <template v-else>
      <div class="user-view__error">
        User not found.
      </div>
    </template>
  </div>
</template>

<script>
import { get } from 'lodash'
import { mapState } from 'vuex'
import User from '@/components/User'

export default {
  name: 'user-view',
  components: {
    User
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      'users',
      'ringzer0teamProfiles'
    ]),
    user () {
      return this.users.find((user) => user.id === this.id)
    },
    ringzer0teamProfile () {
      return this.ringzer0teamProfiles.find((profile) => {
        return profile.id === get(this.user, 'ringzer0team.id')
      })
    }
  }
}
</script>

<style lang="scss">
.user-view {
  &__error {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    font-size: 1em;
    color: red;
  }
}
</style>
