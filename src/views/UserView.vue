<template>
  <div class="user-view">
    <template v-if="user">
      <user :user="user"></user>
    </template>
    <template v-else>
      <div class="user-view__error">
        User not found.
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
  &__error {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
    font-size: 1em;
    color: red;
  }
}
</style>
