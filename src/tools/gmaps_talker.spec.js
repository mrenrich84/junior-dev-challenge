let gmaps_talker = require('./gmaps_talker')
let Candidates = require('../api/models/candidates').Candidates
let Clients = require('../api/models/locations').Clients
let dateHelpers = require('./date_helpers')

describe ('gmaps_talker', () => {
  describe ('callGMapsDistanceMatrix', () => {
    it ('perform a call to the Google Maps Distance Matrix API, creating a Promise, returning a JSON object untouched', async () => {
      const client = Clients[0]
      const candidates = Candidates.filter(candidate => {
        let type = 'modeOfTransport' in candidate ? candidate.modeOfTransport.type : undefined
        return type === 'bike'
      })

      const origins = candidates.map(candidate => candidate.postcode)

      let response = await gmaps_talker.callGMapsDistanceMatrix(origins, client.postcode, 'bicycling', dateHelpers.getNextMonday(new Date))

      expect(response).toHaveProperty('json')
      expect(response.json.destination_addresses.length).toEqual(1)

      // console.log(JSON.stringify(response));
      // {"status":200,"headers":{"content-type":"application/json; charset=UTF-8","date":"Sat, 20 May 2017 14:14:13 GMT","expires":"Sat, 20 May 2017 14:14:43 GMT","cache-control":"public, max-age=30","server":"mafe","x-xss-protection":"1; mode=block","x-frame-options":"SAMEORIGIN","alt-svc":"quic=\":443\"; ma=2592000; v=\"37,36,35\"","accept-ranges":"none","vary":"Accept-Language,Accept-Encoding","connection":"close"},"json":{"destination_addresses":["B4, Germany"],"origin_addresses":["Rocky Ln, Birmingham B42 1QZ, UK","Oldbury B69 1EQ, UK","Middleton Hall Rd, Birmingham B30 1DH, UK","Back Grantham Cl, Bolton BL1 3RZ, UK","Mansel Rd, Birmingham B10 9NN, UK","Fountain Rd, Birmingham B17 8NL, UK","W Heath Rd, Birmingham B18 4DL, UK","Wassell Rd, Halesowen B63 4JU, UK","Over Mill Dr, Birmingham B29 7JL, UK","Brockhurst Rd, Birmingham B36 8JE, UK","Conybere St, Birmingham B12 0YH, UK","Vernon Rd, Birmingham B16 9SQ, UK","Turton Ct, Turton St, Bolton BL1 2SR, UK","Whitehall Rd, Birmingham B9 5EH, UK","Little Meadow Walk, Birmingham B33 8DR, UK","Fulbrook Grove, Birmingham B29 5DS, UK","Outmore Rd, Birmingham B33 0XL, UK","Bolton BL3 5NU, UK","Westbury Rd, Birmingham B17 8JH, UK","Wright Rd, Birmingham B8 1NS, UK","Shelley Dr, Birmingham B23 7SF, UK","Sutherland St, Birmingham B6 7PT, UK"],"rows":[{"elements":[{"distance":{"text":"1,099 km","value":1099202},"duration":{"text":"2 days 3 hours","value":182713},"status":"OK"}]},{"elements":[{"distance":{"text":"1,109 km","value":1108802},"duration":{"text":"2 days 3 hours","value":184455},"status":"OK"}]},{"elements":[{"distance":{"text":"1,090 km","value":1089602},"duration":{"text":"2 days 2 hours","value":180865},"status":"OK"}]},{"elements":[{"distance":{"text":"1,196 km","value":1196246},"duration":{"text":"2 days 9 hours","value":205047},"status":"OK"}]},{"elements":[{"distance":{"text":"1,088 km","value":1087993},"duration":{"text":"2 days 2 hours","value":180669},"status":"OK"}]},{"elements":[{"distance":{"text":"1,096 km","value":1096253},"duration":{"text":"2 days 3 hours","value":182224},"status":"OK"}]},{"elements":[{"distance":{"text":"1,100 km","value":1099965},"duration":{"text":"2 days 3 hours","value":182853},"status":"OK"}]},{"elements":[{"distance":{"text":"1,102 km","value":1102308},"duration":{"text":"2 days 3 hours","value":183661},"status":"OK"}]},{"elements":[{"distance":{"text":"1,090 km","value":1090232},"duration":{"text":"2 days 2 hours","value":181116},"status":"OK"}]},{"elements":[{"distance":{"text":"1,081 km","value":1080923},"duration":{"text":"2 days 2 hours","value":179798},"status":"OK"}]},{"elements":[{"distance":{"text":"1,091 km","value":1091134},"duration":{"text":"2 days 2 hours","value":181236},"status":"OK"}]},{"elements":[{"distance":{"text":"1,097 km","value":1097068},"duration":{"text":"2 days 3 hours","value":182285},"status":"OK"}]},{"elements":[{"distance":{"text":"1,196 km","value":1196027},"duration":{"text":"2 days 9 hours","value":204987},"status":"OK"}]},{"elements":[{"distance":{"text":"1,089 km","value":1089160},"duration":{"text":"2 days 2 hours","value":180901},"status":"OK"}]},{"elements":[{"distance":{"text":"1,088 km","value":1087985},"duration":{"text":"2 days 2 hours","value":180739},"status":"OK"}]},{"elements":[{"distance":{"text":"1,094 km","value":1094228},"duration":{"text":"2 days 2 hours","value":181786},"status":"OK"}]},{"elements":[{"distance":{"text":"1,085 km","value":1085333},"duration":{"text":"2 days 2 hours","value":180253},"status":"OK"}]},{"elements":[{"distance":{"text":"1,195 km","value":1195122},"duration":{"text":"2 days 9 hours","value":204850},"status":"OK"}]},{"elements":[{"distance":{"text":"1,097 km","value":1097400},"duration":{"text":"2 days 3 hours","value":182526},"status":"OK"}]},{"elements":[{"distance":{"text":"1,092 km","value":1092145},"duration":{"text":"2 days 2 hours","value":181484},"status":"OK"}]},{"elements":[{"distance":{"text":"1,096 km","value":1096081},"duration":{"text":"2 days 3 hours","value":182133},"status":"OK"}]},{"elements":[{"distance":{"text":"1,094 km","value":1094469},"duration":{"text":"2 days 3 hours","value":181895},"status":"OK"}]}],"status":"OK"}}
    })
  })

  describe ('callGMapsGeocoder', () => {
    it ('returns a latlon pair', async () => {
      const location = Clients[0].postcode
      let latlng = await gmaps_talker.callGMapsGeocoder(location)
      expect(latlng[0]).toEqual(52.4827934)

      // console.log(location)
      // B4 7XG
    })
  })
})
