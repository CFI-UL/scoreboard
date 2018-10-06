const yoloScraper = require('yolo-scraper')
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
      lines.forEach((line) => {
        if (_.startsWith(line, 'evolution_data_total.push(new Array(')) {
          line = line.replace('evolution_data_total.push(new Array(', '').replace(/\)\);?/, '')
          const info = JSON5.parse(`[${line}]`)
          if (info.length === 4) {
            let category = null
            const categoryMatch = info[3].match(/Challenges\/(.*)\//i)
            if (categoryMatch && categoryMatch.length === 2) {
              category = categoryMatch[1].replace(/-/, ' - ')
            }
            // Points contains the total when the challenge was solved.
            let points = info[1]
            points -= totalPoints
            totalPoints += points

            challenges.push({
              name: info[2],
              category: category,
              validationDate: moment(info[0]).format(),
              points
            })
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
