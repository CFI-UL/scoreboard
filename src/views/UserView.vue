<template>
  <div class="user-view">
    <template v-if="user">
      <h1>
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          {{ user.name }}
        </router-link>
      </h1>
      <router-view></router-view>
    </template>
    <template v-else>
      <error-message>
        User not found.
      </error-message>
    </template>
  </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'user-view',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    ErrorMessage
  },
  computed: {
    ...mapState([
      'users'
    ]),
    ...mapGetters([
      'getUserById'
    ]),
    user () {
      return this.getUserById(this.id)
    }
  }
}
</script>

<style lang="scss">
.user-view {
}
</style>
