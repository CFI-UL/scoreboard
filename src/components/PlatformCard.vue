<template lang="html">
  <div class="platform-card">
    <h2>{{ platform.name }}</h2>
    <p v-for="(text, index) in platform.description" :key="index">
      {{text}}
    </p>
    <a :href="platform.url">{{ platform.url }}</a>
  </div>
</template>

<script>
export default {
  name: 'platform-card',
  props: {
    platform: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.platform-card {

}
</style>
