# CFI Scoreboard :trophy:

[![Build Status](https://travis-ci.org/CFI-UL/scoreboard.svg?branch=master)](https://travis-ci.org/CFI-UL/scoreboard)
[![Greenkeeper badge](https://badges.greenkeeper.io/CFI-UL/scoreboard.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Keep track of the progress you made on different wargame and programming challenge platforms.

- No server needed, it's hosted using [Github Pages](https://pages.github.com/).
- Data is updated daily using [Travis CI CRON](https://docs.travis-ci.com/user/cron-jobs/).

## Requirements

- node >= v10.9.0
- npm

## Setup

Install dependencies:

```shell
npm install
```

## Usage

### Scoreboard

```
$ bin/scoreboard -h

  Usage: scoreboard [options] [command]

  Options:

    -h, --help  output usage information

  Commands:

    update|u    Update all data sets

```

Update all data sets:

```
$ bin/scoreboard update -h

  Usage: update|u [options]

  Update all data sets

  Options:

    -h, --help  output usage information

```

### Users

```
$ bin/users -h

  Usage: users [options] [command]

  Options:

    -h, --help                  output usage information

  Commands:

    add|a [options]             Add a data to the data sets
    search|s [options] <query>  Search users in the data sets

```

Add user:

```
$ bin/users add -h

  Usage: add|a [options]

  Add a data to the data sets

  Options:

    -n, --name <full name>         Full name
    -z, --ringzer0team <username>  Ringzer0team username
    -h, --help                     output usage information

```

Update user:

```
$ bin/users update -h

  Usage: update|u [options] <id>

  Update a user in the data sets

  Options:

    -n, --name <full name>         Full name
    -z, --ringzer0team <username>  Ringzer0team username
    -h, --help                     output usage information

```

Search user:

```
$ bin/users search -h

  Usage: search|s [options] <query>

  Search users in the data sets

  Options:

    -f, --full  Display full information
    -h, --help  output usage information

```

## Development

It's a [Vue.js](https://vuejs.org/) application, it uses

- [vuex](https://vuex.vuejs.org/) to manage the state
- [vue-router](https://router.vuejs.org/) to manage routes
- [apexcharts](https://apexcharts.com/) to display beautiful graphs

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```


## License

MIT
