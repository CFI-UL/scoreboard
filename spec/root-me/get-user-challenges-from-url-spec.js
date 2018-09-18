/* eslint-env jasmine */
const rootMe = require('../../lib/root-me')

jasmine.DEFAULT_TIMEOUT_INTERVAL= 10000

describe('rootMe', () => {
  describe('getUserFromUrl', () => {
    describe('with invalid url', () => {
      const url = 'https://www.google.ca/'

      it('returns an error', () => {
        expect(() => {
          rootMe.getUserChallengesFromUrl(url, () => {})
        }).toThrowError(Error, /invalid/i)
      })
    })

    describe('with valid url', () => {
      describe('with user url that doesn not exist', () => {
        const url = 'https://www.root-me.org/not-a-valid-user-url?lang=fr'

        it('returns the user', (done) => {
          rootMe.getUserChallengesFromUrl(url, (error, challenges) => {
            expect(error).toEqual(null)
            expect(challenges).toEqual([])
            done()
          })
        })
      })

      describe('with user url that exists', () => {
        const url = 'https://www.root-me.org/Simon-Thiboutot?lang=fr'

        it('returns the user', (done) => {
          rootMe.getUserChallengesFromUrl(url, (error, challenges) => {
            expect(error).toBeNull()
            expect(challenges.length).toBeGreaterThanOrEqual(59)
            done()
          })
        })
      })
    })
  })
})
