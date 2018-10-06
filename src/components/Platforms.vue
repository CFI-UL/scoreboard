<template>
  <div class="platforms">
    <h1>Platforms</h1>
    <div class="platforms__platforms">
      <router-link
        class="platforms__platforms-item"
        v-for="platform in platforms"
        tag="div"
        :to="platformRoute(platform)"
        :key="platform.id">
        <h2>{{ platform.name }}</h2>
        <p v-for="(text, index) in platform.description" :key="index">
          {{text}}
        </p>
        <p>
          Players: {{ platformUsers(platform).length }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import PlatformCard from '@/components/PlatformCard'
import { has } from 'lodash'

export default {
  name: 'platforms',
  components: {
    PlatformCard
  },
  props: {
    platforms: {
      type: Array,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    platformRoute (platform) {
      return {
        name: 'platform',
        params: {
          platformId: platform.id
        }
      }
    },
    platformUsers (platform) {
      return this.users.filter((user) => {
        return has(user, [platform.id])
      })
    }
  }
}
</script>

<style lang="scss">
.platforms {

  &__platforms-item {
    cursor: pointer;
    background: #f5f5f5;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 1rem 0;
    border: 1px solid #d0d0d0;
    border-radius: 10px;
  }
}
</style>
