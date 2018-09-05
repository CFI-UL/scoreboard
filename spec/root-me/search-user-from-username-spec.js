/* eslint-env jasmine */
const rootMe = require('../../lib/root-me')

jasmine.DEFAULT_TIMEOUT_INTERVAL= 10000

describe('rootMe', () => {
  describe('searchUserFromUsername', () => {
    describe('with invalid username', () => {
      const username = 'this-is-an-invalid-username'

      it('returns an error', (done) => {
        rootMe.searchUserFromUsername(username, (error, user) => {
          expect(error).not.toBeNull()
          expect(user).toBeNull()
          done()
        })
      })
    })

    describe('with valid username', () => {
      const username = 'lilc4t'

      it('returns the user', (done) => {
        rootMe.searchUserFromUsername(username, (error, user) => {
          expect(error).toBeNull()
          expect(user.id).toEqual('Simon-Thiboutot')
          expect(user.username).toEqual(username)
          expect(user.url).toEqual('https://www.root-me.org/Simon-Thiboutot')
          done()
        })
      })
    })
  })
})
