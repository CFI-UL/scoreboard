# CFI Scoreboard

[![Build Status](https://travis-ci.org/CFI-UL/scoreboard.svg?branch=master)](https://travis-ci.org/CFI-UL/scoreboard)

## Requirements

- node >= v10.9.0
- npm

## Setup

Install dependencies:

```shell
npm install
```

## Usage

```
$ bin/update-data -h

  Usage: update-data [options] [command]

  Options:

    -h, --help       output usage information

  Commands:

    update|u         Update all data sets
    add|a [options]  Add a user to the data sets

```

Update all data sets:

```
$ bin/update-data update -h

  Usage: update|u [options]

  Update all data sets

  Options:

    -h, --help  output usage information

```

Add a user to the data sets:

```
bin/update-data add -h

  Usage: add|a [options]

  Add a user to the data sets

  Options:

    -n, --name <full name>         Full name
    -z, --ringzer0team <username>  Ringzer0team username
    -e, --exec_mode <mode>         Which exec mode to use
    -h, --help                     output usage information

```

## Development

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
