<template>
  <div id="app">
    <header class="menu">
      <router-link to="/">
        <h1>CFI Scoreboard</h1>
      </router-link>
      <nav>
        <ul class="menu__navigation">
          <li
            v-for="platform in platforms"
            :key="platform.id"
            class="menu__item">
            <router-link :to="platformRoute(platform)">
              {{ platform.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view/>
    <footer class="footer">
      <div class="footer__item">
        <a :href="addMeUrl">Add me</a>
      </div>
      <div class="footer__item">
        <a :href="repositoryUrl">Source code</a>
      </div>
      <div class="footer__item">
        © CFIUL {{ currentYear }}
      </div>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState([
      'platforms'
    ]),
    addMeUrl () {
      return 'https://github.com/CFI-UL/scoreboard/issues/new?assignees=masterT&labels=&template=add-user.md&title=Add+user+%7B%7B+your+name+%7D%7D'
    },
    repositoryUrl () {
      return 'https://github.com/CFI-UL/scoreboard/'
    },
    currentYear () {
      return moment().format('YYYY')
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
    }
  }
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

.footer {
  display: flex;
  justify-content: center;

  &__item {
    margin: 0 1em;
  }
}

</style>
