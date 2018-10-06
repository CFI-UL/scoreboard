<template lang="html">
  <div class="error-message">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'error-message'
}
</script>

<style lang="scss">
.error-message {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  font-size: 1em;
  color: red;
}
</style>
