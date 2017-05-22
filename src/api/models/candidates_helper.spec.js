let mockGmapsTalker = require('../../tools/testUtilities').mockGmapsTalker
jest.mock('../../tools/gmaps_talker', () => mockGmapsTalker)

let candidatesHelper = require('./candidates_helper')


describe('candidatesHelper', () => {
  describe('getCandidatesWithTravelInfo(destination)', () => {
    it('returns all the candidates with their travel info to destination according to their transport methods', async done => {
      const destination = 'B4 7XG'
      const candidates = await candidatesHelper.getCandidatesWithTravelInfo(destination)
      candidates.forEach(candidate => {
        expect(typeof(candidate.meters_to_client)).toEqual('number')
        expect(typeof(candidate.seconds_to_client)).toEqual('number')
        done()
      })
      // console.log(candidates)
      // // [ { name: 'Agnezka Seize-Soinxante-Quatre',
      // // postcode: 'B42 1QZ',
      // // modeOfTransport: { type: 'bike', speed: 15.5 },
      // // meters_to_client: 1099202,
      // // seconds_to_client: 182713 },
      // // ... ]
    })
  })
})
