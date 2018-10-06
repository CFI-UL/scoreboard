<template lang="html">
  <div class="platforms-view">
    <platforms :platforms="platforms" :users="users"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Platforms from '@/components/Platforms'

export default {
  name: 'platforms-view',
  components: {
    Platforms
  },
  computed: {
    ...mapState([
      'platforms',
      'users'
    ])
  }
}
</script>

<style lang="scss">
.platforms-view {

}
</style>
