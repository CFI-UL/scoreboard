const yoloScraper = require('yolo-scraper')
const url = require('url')

const BASE_URL = 'https://www.root-me.org'

module.exports = yoloScraper.createScraper({

  request: function (username) {
    this.username = username
    return {
      url: BASE_URL,
      qs: {
        page: 'recherche',
        lang: 'en',
        recherche: username
      }
    }
  },

  extract: function (response, body, $) {
    const users = $('.t-body a.forum').toArray().map((a) => {
      const $a = $(a)
      const linkUrl = new url.URL($a.attr('href').trim(), BASE_URL)
      const userUrl = linkUrl.toString().replace(linkUrl.search, '')
      const userUsername = $a.text().trim()
      const userId = linkUrl.pathname.split('/')[1]
      return {
        id: userId,
        username: userUsername,
        url: userUrl
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
      }
    },
    "required": [
      "id",
      "username",
      "url"
    ]
  }
})
