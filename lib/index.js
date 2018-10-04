const _ = require('lodash')
const uuidv4 = require('uuid/v4')
const utils = require('./utils')
const ringzer0team = require('./ringzer0team')

function Ringzer0teamFetchUserByUsername (username) {
  return new Promise((resolve, reject) => {
    console.log('Fetching Ringzer0team user %s', username)
    ringzer0team.getUserFromUsername(username, (error, user) => {
      ringzer0team.getUserProfile(user.id, (error, profile) => {
        // Merge user and profile.
        const ringzer0teamUser = Object.assign({}, user, profile)
        resolve(ringzer0teamUser)
      })
    })
  })
}

function updateAll () {
  console.log('Update all');
  let users = utils.getUsers()

  return utils.promiseMap(users, (user) => {
    const promises = []

    // Ringzer0team?
    if (_.has(user, 'ringzer0team.username')) {
      promises.push(
        Ringzer0teamFetchUserByUsername(user.ringzer0team.username)
          .then((ringzer0teamUser) => {
            // Merge new ringzer0team data with user ringzer0team data.
            user.ringzer0team = ringzer0teamUser
            return user
          })
      )
    }

    return Promise.all(promises)
      .then((newUsers) => {
        return newUsers.reduce((currentUser, newUser) => {
          return Object.assign(currentUser, newUser)
        })
      }, user)
      .catch((error) => {
        console.error(error)
        return user
      })
  })
    .then((newUsers) => {
      // Save new user data.
      utils.updateUsers(newUsers)
      console.log('Done!')
    })
}

function addUser (name, options = {}) {
  if (_.isEmpty(name)) {
    throw new Error('Option name can\'t be empty')
  }
  const availableOptionNames = ['ringzer0team']
  Object.keys(options).forEach((key) => {
    if (!availableOptionNames.includes(key)) {
      throw new Error(`Unkown option ${key}`)
    }
  })
  // Initialize new user.
  let user = { id: uuidv4(), name }

  const promises = []

  if (!_.isEmpty(options['ringzer0team'])) {
    user.ringzer0team = {
      username: options['ringzer0team']
    }
    promises.push(
      Ringzer0teamFetchUserByUsername(options['ringzer0team'])
        .then((ringzer0teamUser) => {
          user.ringzer0team = ringzer0teamUser
        })
    )
  }

  return Promise.all(promises)
    .then(() => {
      console.log('Adding user')
      utils.updateUser(user)
      return user
    })
}

function updateUser (id, options = {}) {
  if (_.isEmpty(id)) {
    throw new Error('Option id can\'t be empty')
  }
  const availableOptionNames = ['name', 'ringzer0team']
  Object.keys(options).forEach((key) => {
    if (!availableOptionNames.includes(key)) {
      throw new Error(`Unkown option ${key}`)
    }
  })
  // Find user.
  let users = utils.getUsers()
  let user = users.find(currentUser => currentUser.id === id)

  if (!user) {
    throw new Error(`Can't find user with id "${id}"`)
  }

  const promises = []

  if (!_.isEmpty(options['name'])) {
    user.name = options.name
  }

  if (!_.isEmpty(options['ringzer0team'])) {
    user.ringzer0team = {
      username: options['ringzer0team']
    }
    promises.push(
      Ringzer0teamFetchUserByUsername(options['ringzer0team'])
        .then((ringzer0teamUser) => {
          user.ringzer0team = ringzer0teamUser
        })
    )
  }

  return Promise.all(promises)
    .then(() => {
      console.log('Updating user')
      utils.updateUser(user)
      return user
    })
}

function searchUser (query) {
  if (_.isEmpty(query)) {
    throw new Error('Query can\'t be empty')
  }
  query = query.toLowerCase()
  return utils.getUsers().filter((user) => {
    const values = [
      _.get(user, 'id', ''),
      _.get(user, 'name', ''),
      _.get(user, 'ringzer0team.id', ''),
      _.get(user, 'ringzer0team.username', ''),
    ]
    return values.some((value) => {
      return _.includes(String(value).toLowerCase(), query)
    })
  })
}


module.exports = {
  Ringzer0teamFetchUserByUsername,
  updateAll,
  addUser,
  updateUser,
  searchUser
}
