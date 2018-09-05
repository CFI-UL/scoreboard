const path = require('path')
const fs = require('fs')
const _ = require('lodash')

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
  }
  
  let results = []
  return aux(collection, results)
}

function skip (collection, predicate) {
  return collection.filter(element => !predicate(element))
}


function dataFilePath () {
  const args = Array.from(arguments)
  return path.join.apply(null, [__dirname, '..', '..', 'data'].concat(args))
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

module.exports = {
  promiseMap,
  skip,
  dataFilePath,
  dataFileRead,
  dataFileReadJson,
  dataFileWriteJson,
  getUsers
}