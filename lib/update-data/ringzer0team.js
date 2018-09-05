const _ = require('lodash')
const ringzer0team = require('../ringzer0team')
const utils = require('./utils')

function fetchUser (username) {
  return new Promise((resolve, reject) => {
    console.log('Fetching Ringzer0team user %s', username)
    ringzer0team.getUserFromUsername(username, (error, user) => {
      resolve(user)
    })
  })
}

function fetchProfile (id) {
  return new Promise((resolve, reject) => {
    console.log('Fetching Ringzer0team profile id %s', id)
    ringzer0team.getUserProfile(id, (error, profile) => {
      resolve(profile)
    })
  })
}

function fetchUsers (usernames) {
  return utils.promiseMap(usernames, fetchUser)
}

function fetchProfiles (ids) {
  return utils.promiseMap(ids, fetchProfile)
}

// TODO: Move this function in the ./index.js file.
function updateUsers () {
  const usernames = getRingzer0teamUsernames()
  console.log('Update users')
  return fetchUsers(usernames).then((ringzer0teamUsers) => {
    ringzer0teamUsers = utils.skip(ringzer0teamUsers, _.isNull)
    const users = utils.getUsers()
    for (var i = 0; i < users.length; i++) {
      // Update ringzero user.
      users[i].ringzer0team = ringzer0teamUsers.find((ringzer0teamUser) => {
        return users[i].ringzer0team.id === ringzer0teamUser.id
      })
    }
    console.log('Writing users')
    utils.dataFileWriteJson(users, 'users.json')
  }).catch((error) => {
    console.error(error)
  })
}

function updateProfiles () {
  const userIds = getRingzer0teamUserIds()
  console.log('Update Ringzer0team profiles')
  return fetchProfiles(userIds).then((profiles) => {
    console.log('Writing Ringzer0team profiles')
    profiles = utils.skip(profiles, _.isNull)
    utils.dataFileWriteJson(profiles, 'ringzer0team', 'profiles.json')
  }).catch((error) => {
    console.error(error)
  })
}

function getRingzer0teamUsernames () {
  return getRingzer0teamUsers().map((ringzer0teamUser) => ringzer0teamUser.username)
}

function getRingzer0teamUserIds () {
  return getRingzer0teamUsers().map((ringzer0teamUser) => ringzer0teamUser.id)
}

function getRingzer0teamUsers () {
  return utils.getUsers().map(user => user.ringzer0team)
}

function getRingzer0teamProfiles () {
  return utils.dataFileReadJson('ringzer0team', 'profiles.json')
}

function crunchMetricByMonths () {

}

module.exports = {
  fetchUser,
  fetchProfile,
  fetchUsers,
  fetchProfiles,
  updateUsers,
  updateProfiles,
  getRingzer0teamUsernames,
  getRingzer0teamUserIds,
  getRingzer0teamUsers,
  getRingzer0teamProfiles
}
