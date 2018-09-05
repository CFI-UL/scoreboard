const yoloScraper = require('yolo-scraper')
const url = require('url')

const BASE_URL = 'https://www.root-me.org'

module.exports = yoloScraper.createScraper({

  request: function (id) {
    this.id = id
    return {
      baseUrl: BASE_URL,
      url: id,
      qs: {
        inc: 'score',
        lang: 'en'
      }
    }
  },

  extract: function (response, body, $) {
    const $ul = $($('.t-body ul')[0])
    const userUrl = new url.URL(this.id, BASE_URL)
    let userPoints = null
    if ($ul.find('li').length > 0) {
      const $span = $($($ul.find('li')[0]).find('span'))
      userPoints = parseInt($span.text().toLowerCase().split('point')[0].trim())
    }
    return {
      id: this.id,
      url: userUrl.toString(),
      username: $('.t-body h1').text().trim(),
      points: userPoints
    }
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
