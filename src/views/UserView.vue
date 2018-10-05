<template>
  <div class="user-view">
    <template v-if="user">
      <h2>{{ user.name }}</h2>
      <router-view></router-view>
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

export default {
  name: 'user-view',
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
