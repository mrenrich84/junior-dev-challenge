let request = require('request-promise-native')

describe ("API server", () => {
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
  describe ('/clients', () => {
    it ("returns a list of clients" , async () => {
      // sends a request to the API
      let options = {
        uri:  'http://localhost:8000/clients',
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)

      expect(res.statusCode).toEqual(200)
      let clients = JSON.parse(res.body)
      expect(clients[0].name).toEqual("Ale")
    })
  })
})
