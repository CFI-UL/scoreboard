/* eslint-env jasmine */
const rootMe = require('../../lib/root-me')

jasmine.DEFAULT_TIMEOUT_INTERVAL= 10000

describe('rootMe', () => {
  describe('getUserFromId', () => {
    describe('with invalid id', () => {
      const id = 'this-is-an-invalid-id'

      it('returns an error', (done) => {
        rootMe.getUserFromId(id, (error, user) => {
          expect(error).not.toBeNull()
          expect(user).toBeNull()
          done()
        })
      })
    })

    describe('with valid id', () => {
      const id = 'Simon-Thiboutot'

      it('returns the user', (done) => {
        rootMe.getUserFromId(id, (error, user) => {
          expect(error).toBeNull()
          expect(user.id).toEqual('Simon-Thiboutot')
          expect(user.id).toEqual(id)
          expect(user.url).toEqual('https://www.root-me.org/Simon-Thiboutot')
          expect(user.points).toBeGreaterThanOrEqual(1070)
          done()
        })
      })
    })
  })
})
