/* eslint-env jasmine */
const ringzer0team = require('../../lib/ringzer0team')

jasmine.DEFAULT_TIMEOUT_INTERVAL= 10000

describe('ringzer0team', () => {
  describe('getUserProfile', () => {
    describe('with invalid id', () => {
      const id = 'this-is-an-invalid-id'
      
      it('returns an error', (done) => {
        ringzer0team.getUserProfile(id, (error, profile) => {
          expect(error).not.toBeNull()
          expect(profile).toBeNull()
          done()
        })
      })
    })
    
    describe('with valid id', () => {
      const id = '5097'
      
      it('returns the profile', (done) => {
        ringzer0team.getUserProfile(id, (error, profile) => {
          expect(error).toBeNull()
          expect(profile.id).toEqual('5097')
          expect(Array.isArray(profile.challenges)).toEqual(true)
          expect(profile.challenges.length).toBeGreaterThanOrEqual(54)
          done()
        })
      })
    })
  })
})