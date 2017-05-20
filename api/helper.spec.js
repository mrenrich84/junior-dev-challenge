let helper = require('./helper')

describe ('Helper', () => {
  describe ('getClients', () => {
    it('returns a list of Clients', () => {
      const res = {
        json: (clients) => {
          expect(clients[0].name).toEqual("Ale")
        }
      }
      helper.getClients(undefined, res)
    })
  })
  describe ('getClientById', () => {
    it('returns an object with client plus candidates with their travel info', done => {
      // helper.getClientById == {
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
      const req = {params: {id: 0}}
      const res = {
        json: (data) => {
          expect(data.client.name).toEqual("Ale")
          data.candidates.forEach(candidate => {
            expect(typeof(candidate.meters_to_client)).toEqual('number')
            expect(typeof(candidate.seconds_to_client)).toEqual('number')
            done()
          })
        }
      }


      helper.getClientById(req, res)
    })
  })
})
