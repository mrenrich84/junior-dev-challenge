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
  xdescribe ('/client/:id', () => {
    it ("returns a list of candidates with their distance in meters and seconds to the client" , async () => {
      // sends a request to the API
      let options = {
        uri:  'http://localhost:8000/client/0',
        resolveWithFullResponse: true,
        simple: false
      }
      let res = await request(options)

      expect(res.statusCode).toEqual(200)
      // res.body == {
      //   client: {
      //     {
      //       name:"Ale",
      //       postcode:"B4 7XG"
      //     },
      //   candidates: [
      //       {
      //         name: "Agnezka Seize-Soinxante-Quatre",
      //         postcode: "B42 1QZ",
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
