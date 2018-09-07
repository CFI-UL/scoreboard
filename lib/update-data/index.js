const _ = require('lodash')
const uuidv4 = require('uuid/v4')
const utils = require('./utils')
const ringzer0team = require('./ringzer0team')

function updateAll () {
  console.log('Update all');
  return ringzer0team.updateUsers()
    .then(() => ringzer0team.updateProfiles())
    .then(() => console.log('Done!'))
}

function addUser (name, options = {}) {
  if (_.isEmpty(name)) {
    throw new Error('Option name can\'t be empty')
  }
  const availableOptionNames = ['ringzer0team']
  Object.keys(options).forEach((key) => {
    if (!availableOptionNames.includes(key)) {
      throw new Error(`Unkown option ${key}`)
    } else if (_.isEmpty(options[key])) {
      throw new Error(`Requires option ${key} can't be empty`)
    }
  })

  let user = {
    id: uuidv4(),
    name,
    ringzer0team: {
      username: options['ringzer0team']
    }
  }

  console.log('Create user with id: %s', user.id)

  // Ringzer0team user.
  return ringzer0team.fetchUser(options['ringzer0team'])
    .then((ringzer0teamUser) => {
      user.ringzer0team = ringzer0teamUser
      // Update users.
      let users = utils.getUsers()
      for (var i = 0; i < users.length; i++) {
        if (users[i].ringzer0team.username === user.ringzer0team.username) {
          const message = 'Alread a user with the same ringzer0team username'
          throw new Error(`${message}\n${JSON.stringify(users[i], null, 2)}`)
        }
      }
      users.push(user)
      console.log('Writing users')
      utils.dataFileWriteJson(users, 'users.json')
      return user
    })
    .then((user) => {
      // Update profile.
      return ringzer0team.fetchProfile(user.ringzer0team.id)
        .then((profile) => {
          let profiles = ringzer0team.getRingzer0teamProfiles()
          for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].id === profile.id) {
              throw new Error(`Alread a ringzer0team profile with the same id ${profile.id}`)
            }
          }
          profiles.push(profile)
          console.log('Writing profiles')
          utils.dataFileWriteJson(profiles, 'ringzer0team', 'profiles.json')
        })
    })
}


module.exports = {
  updateAll,
  addUser
}
