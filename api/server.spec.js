let server = require('./server')
let request = require('request-promise-native')

describe ("API server", () => {
  afterAll(() => {
    server.close()
  })
  describe ('/', () => {
    it ("API server is on" , async () => {
      let options = {
        uri:  'http://localhost:8000/',
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)
      expect(res.statusCode).toEqual(200)
    })
  })
  xdescribe ('/get_list_of_clients', () => {
    it ("returns a list of clients" , async () => {
      // sends a request to the API
      let options = {
        uri:  'http://localhost:8000/get_list_of_clients',
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)

      // expect to receive 200
      expect(res.statusCode).toEqual(200)
      // expect to find in the results some known data
    })
  })
})
