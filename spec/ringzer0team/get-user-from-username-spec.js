/* eslint-env jasmine */
const ringzer0team = require('../../lib/ringzer0team')

jasmine.DEFAULT_TIMEOUT_INTERVAL= 10000

describe('ringzer0team', () => {
  describe('getUserFromUsername', () => {
    describe('with invalid username', () => {
      const username = 'this-is-an-invalid-username'
      
      it('returns an error', (done) => {
        ringzer0team.getUserFromUsername(username, (error, user) => {
          expect(error).not.toBeNull()
          expect(user).toBeNull()
          done()
        })
      })
    })
    
    describe('with valid username', () => {
      const username = 'LilC4T'
      
      it('returns the user', (done) => {
        ringzer0team.getUserFromUsername(username, (error, user) => {
          expect(error).toBeNull()
          expect(user.id).toEqual('5097')
          expect(user.username).toEqual(username)
          expect(user.url).toEqual('https://ringzer0team.com/profile/5097/LilC4T')
          expect(user.points).toBeGreaterThanOrEqual(114)
          done()
        })
      })
    })
  })
})