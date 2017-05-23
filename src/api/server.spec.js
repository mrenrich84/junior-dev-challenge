let request = require('request-promise-native')

let mockGmapsTalker = require('../tools/testUtilities').mockGmapsTalker
jest.mock('../tools/gmaps_talker', () => mockGmapsTalker)

let server_handle = require('./server')
const API_PORT = require('../shared/config').API_PORT

describe ("API server", () => {
  afterAll(done => {
    console.log('Shutting down server');
    server_handle.close()
    done()
  })
  describe ('/', () => {
    it ("API server is on" , async () => {
      let options = {
        uri:  `http://localhost:${API_PORT}/`,
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)
      expect(res.statusCode).toEqual(200)
    })
  })
  describe ('/clients', () => {
    it ("returns a list of clients" , async () => {
      // sends a request to the API
      let options = {
        uri:  `http://localhost:${API_PORT}/clients`,
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)

      expect(res.statusCode).toEqual(200)
      let clients = JSON.parse(res.body)
      expect(clients[0].name).toEqual("Ale")
    })
  })
  describe ('/client/:id', () => {
    it ("returns a list of candidates with their distance in meters and seconds to the client" , async () => {
      // sends a request to the API
      let options = {
        uri:  `http://localhost:${API_PORT}/client/0`,
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)

      expect(res.statusCode).toEqual(200)
      // res.body == {
      //   client: {
      //     {
      //       name:"Ale",
      //       postcode:"B4 7XG",
      //       location: [lat,lng]
      //     },
      //   candidates: [
      //       {
      //         name: "Agnezka Seize-Soinxante-Quatre",
      //         postcode: "B42 1QZ",
      //         location: [lat,lng]
      //         modeOfTransport: {
      //           type: "bike",
      //           speed: 15.5
      //         },
      //         meters_to_client: 215369,
      //         seconds_to_client: 9390
      //       },
      //       ...
      //     ]
      //   }
      // }
      JSON.parse(res.body).candidates.forEach(candidate => {
        expect(typeof(candidate.meters_to_client)).toEqual('number')
        expect(typeof(candidate.seconds_to_client)).toEqual('number')
      })
    })
  })
})
