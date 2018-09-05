<template>
  <div class="user">
    <h2 class="user__name">#{{ position }} {{user.name}}</h2>
    <template v-if="user.ringzer0team">
      <div class="user-info">
        <h3 class="user__ringzer0team">Ringzer0team</h3>
        <div>
          <a :href="user.ringzer0team.url">
            {{user.ringzer0team.username}}
          </a>
        </div>
        <div class="">
          {{user.ringzer0team.points}} points
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user',
  props: {
    index: {
      type: Number,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    position () {
      return this.$props.index + 1
    }
  }
}
</script>

<style lang="scss">
.user {
  margin-top: 1rem;
  margin-bottom: 1rem;

  &__name {
    margin: 0;
  }
  &__ringzer0team {
    margin: 0;
  }
}
</style>
