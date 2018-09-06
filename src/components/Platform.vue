<template>
  <div class="platform">
    <div class="platform__info">
      <h2>{{ name }}</h2>
      <p v-for="(text, index) in description" :key="index">
        {{text}}
      </p>
      <a :href="url">{{ url }}</a>
    </div>
    <div class="platform__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'platform',
  props: {
    name: String,
    description: Array,
    url: String
  }
}
</script>

<style lang="scss">
.platform {

}
</style>
