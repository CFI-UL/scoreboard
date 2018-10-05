<template>
  <div id="app">
    <header class="menu">
      <router-link to="/">
        <h1>CFI Scoreboard</h1>
      </router-link>
      <nav>
        <ul class="menu__navigation">
          <li class="menu__item">
            <router-link to="/ringzer0team">Ringzer0team</router-link>
          </li>
          <li class="menu__item">
            <router-link to="/root-me">Root Me</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 900px;
  margin: 0 auto;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #2c3e50;
    text-decoration: none;
  }

  &__navigation {
    padding: 0;
    margin: 0;
  }
  &__item {
    display: inline-block;
    margin: 0 1rem;
  }
}

</style>
