const yoloScraper = require('yolo-scraper')
const url = require('url')

const BASE_URL = 'https://ringzer0ctf.com'

module.exports = yoloScraper.createScraper({

  request: function (username) {
    this.username = username
    return {
      baseUrl: BASE_URL,
      url: '/ajax.php',
      qs: {
        a: 'search',
        s: username
      }
    }
  },
  
  parseIdFromUrlPath (urlPath) {
    const matches = urlPath.match(/\/(\d+)\//)
    if (matches) {
      return matches[1]
    }
  },

  extract: function (response, body, $) {
    const users = $('table tbody tr').toArray().map((tr) => {
      const $tr = $(tr)
      const $td0 = $($tr.find('td')[0])
      const $td1 = $($tr.find('td')[1])
      const userUsername = $td0.text().trim()
      const userUrlPath = $($td0.find('a')).attr('href').trim()
      const userUrl = url.resolve(BASE_URL, userUrlPath)
      const userId = this.parseIdFromUrlPath(userUrlPath)
      const userPoints = parseInt($td1.text().trim())
      return {
        id: userId,
        username: userUsername,
        url: userUrl,
        points: userPoints 
      }
    })
    return users.find((user) => {
      return user.username.toLowerCase() === this.username.toLowerCase() 
    })
  },

  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string"
      },
      "username": {
        "type": "string"
      },
      "url": {
        "type": "string", "format": "uri"
      },
      "points": {
        "type": "integer"
      }
    },
    "required": [
      "id",
      "username",
      "url",
      "points"
    ]
  }
})