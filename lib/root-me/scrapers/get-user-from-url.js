
const yoloScraper = require('yolo-scraper')
const url = require('url')

const BASE_URL = 'https://www.root-me.org'

module.exports = yoloScraper.createScraper({

  validateUserUrl: function (userUrl) {
    return new url.URL(BASE_URL).hostname === new url.URL(userUrl).hostname
  },

  request: function (userUrl) {
    // Validate the URL.
    if (!this.validateUserUrl(userUrl)) {
      throw new Error('Invalid URL')
    }
    this.url = userUrl
    return {
      url: userUrl,
      qs: {
        inc: 'score',
        lang: 'en'
      }
    }
  },

  extract: function (response, body, $) {
    const $ul = $($('.t-body ul')[0])
    let userPoints = null
    if ($ul.find('li').length > 0) {
      const $span = $($($ul.find('li')[0]).find('span'))
      userPoints = parseInt($span.text().toLowerCase().split('point')[0].trim())
    }
    let userUrl = new url.URL(this.url)
    return {
      url: userUrl.toString().replace(userUrl.search + userUrl.hash, ''),
      username: $('.t-body h1').text().trim(),
      points: userPoints
    }
  },

  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "additionalProperties": false,
    "properties": {
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
      "username",
      "url",
      "points"
    ]
  }
})
