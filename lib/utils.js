const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const Ajv = require('ajv')
const schemas = {
  users: require('./schemas/users.json')
}
const ajv = new Ajv()

function promiseMap (collection, func) {
  function aux (collection, results) {
    let element = collection.shift()
    return func(element)
      .then((result) => {
        results.push(result)
        if (_.isEmpty(collection)) {
          return results
        } else {
          return aux(collection, results)
        }
      })
      .catch((error) => {
        console.error(error)
        if (_.isEmpty(collection)) {
          return results
        } else {
          return aux(collection, results)
        }
      })
  }

  let results = []
  return aux(collection, results)
}

function skip (collection, predicate) {
  return collection.filter(element => !predicate(element))
}

function dataFilePath () {
  const args = Array.from(arguments)
  return path.join.apply(null, [__dirname, '..', 'data'].concat(args))
}

function dataFileRead () {
  const args = Array.from(arguments)
  const filePath = dataFilePath.apply(null, args)
  return fs.readFileSync(filePath)
}

function dataFileReadJson () {
  const args = Array.from(arguments)
  const data = dataFileRead.apply(null, args)
  return JSON.parse(data)
}

function dataFileWriteJson () {
  const args = Array.from(arguments)
  const json = args.shift()
  const filePath = dataFilePath.apply(null, args)
  return fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
}

function getUsers () {
  return dataFileReadJson('users.json')
}

function updateUsers (users) {
  var valid = ajv.validate(schemas.users, users)
  if (valid) {
    return dataFileWriteJson(users, 'users.json')
  } else {
    console.log('Invalid users (against JSON schema)', ajv.errors)
  }
}

function updateUser (user) {
  const users = getUsers()
  const index = _.findIndex(users, currentUser => currentUser.id === user.id)
  if (index !== -1) {
    users[index] = Object.assign(users[index], user)
  } else {
    users.push(user)
  }
  return updateUsers(users)
}

module.exports = {
  promiseMap,
  skip,
  dataFilePath,
  dataFileRead,
  dataFileReadJson,
  dataFileWriteJson,
  promiseMap,
  skip,
  getUsers,
  updateUsers,
  updateUser,
}
