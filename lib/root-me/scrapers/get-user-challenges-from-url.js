const yoloScraper = require('yolo-scraper')
const cheerio = require('cheerio')
const _ = require('lodash')
const url = require('url')
const JSON5 = require('json5')
const moment = require('moment')

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
        inc: 'statistiques',
        lang: 'en'
      }
    }
  },

  extract: function (response, body, $) {
    const challenges = []
    const scripts = $('script')
    if (scripts.length >= 4) {
      let totalPoints = 0
      const lines = $(scripts[3]).text().split(/\r?\n/)
      let isChallenge = false
      let challengeData = ''
      let challengeLineCount = 0

      lines.forEach((line) => {
        // Start of the challenge.
        if (_.startsWith(line, 'validations.push(')) {
          challengeData = ''
          isChallenge = true
        } else if (isChallenge) {
          if (challengeLineCount === 4) {
            const info = JSON5.parse('{' + challengeData + '}')
            const $$ = cheerio.load(info['titre'])
            const lastLink = $$(_.last($$('a')))
            const hrefParts = lastLink.attr('href').split('/')
            const challenge = {}
            // Challenge name.
            challenge.name = hrefParts[hrefParts.length - 1]
            // Challenge category.
            challenge.category = hrefParts[hrefParts.length - 2]
            // Challenge points.
            challenge.points = info['score']
            // Challenge validationDate.
            challenge.validationDate = moment(info['date']).format()

            challenges.push(challenge)
            // reset flags
            challengeLineCount = 0
            isChallenge = false
          } else {
            challengeLineCount++
            challengeData += line
          }
        }
      })
    }
    return challenges
  },

  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "array",
    "item": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "validationDate": {
          "type": "string", "format": "date-time"
        },
        "points": {
          "type": "integer"
        }
      },
      "required": [
        "name",
        "category",
        "validationDate",
        "points"
      ]
    }
  }
})
