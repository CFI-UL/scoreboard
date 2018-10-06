/* eslint-env jasmine */
const rootMe = require('../../lib/root-me')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

describe('rootMe', () => {
  describe('getUserFromUrl', () => {
    describe('with invalid url', () => {
      const url = 'https://www.google.ca/'

      it('returns an error', () => {
        expect(() => {
          rootMe.getUserFromUrl(url, () => {})
        }).toThrowError(Error, /invalid/i)
      })
    })

    describe('with valid url', () => {
      describe('with user url that doesn not exist', () => {
        const url = 'https://www.root-me.org/not-a-valid-user-url?lang=fr'

        it('returns the user', (done) => {
          rootMe.getUserFromUrl(url, (error, user) => {
            expect(error).not.toEqual(null)
            expect(user).toEqual(null)
            done()
          })
        })
      })

      describe('with user url that exists', () => {
        const url = 'https://www.root-me.org/Simon-Thiboutot?lang=fr'

        it('returns the user', (done) => {
          rootMe.getUserFromUrl(url, (error, user) => {
            expect(error).toBeNull()
            expect(user.url).toEqual('https://www.root-me.org/Simon-Thiboutot')
            expect(user.points).toBeGreaterThanOrEqual(1070)
            done()
          })
        })
      })
    })
  })
})
