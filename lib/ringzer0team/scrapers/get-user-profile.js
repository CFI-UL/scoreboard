const yoloScraper = require('yolo-scraper')
const moment = require('moment-timezone')

const BASE_URL = 'https://ringzer0team.com'

module.exports = yoloScraper.createScraper({

  request: function (id) {
    this.id = String(id)
    return {
      baseUrl: BASE_URL,
      url: `/profile/${id}`,
      followRedirect: false
    }
  },
  
  extract: function (response, body, $) {
    if (response.statusCode !== 200) return null
    const $table = $($('table')[3])
    const challenges = $table.find('tbody tr').toArray().map((tr) => {
      const $tr = $(tr)
      const $td0 = $($tr.find('td')[0])
      const $td1 = $($tr.find('td')[1])
      const $td2 = $($tr.find('td')[2])
      const validationDate = moment.tz($td0.text().trim(), 'UTC').format()
      const categoryAndName = $td1.text().trim()
      const category = $($td1.find('div')).text().trim()
      const name = categoryAndName.replace(category, '')
      const points = parseInt($td2.text().trim())
      return { name, category, validationDate, points }
    })
    return {
      id: this.id,
      challenges
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
      "challenges": {
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
      "challenges"
    ]
  }
})