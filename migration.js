const _ = require('lodash')
const utils = require('./lib/utils')
const scoreboard = require('./lib')

console.log('Migrate all users');
const users = utils.dataFileReadJson('users-backup.json')
return utils.promiseMap(users, (user) => {
  const promises = []

  // Ringzer0team?
  if (_.has(user, 'ringzer0team.username')) {
    promises.push(
      scoreboard.fetchUserByUsername(user.ringzer0team.username)
        .then((ringzer0teamUser) => {
          // Merge new ringzer0team data with user ringzer0team data.
          user.ringzer0team = ringzer0teamUser
          return user
        })
    )
  }

  if (_.isEmpty(promises)) return new Promise((resolve) => resolve(user))

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
