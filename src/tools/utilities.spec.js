let utilities = require('./utilities')

const candidates = [
  {
  	"name": "Agnezka Seize-Soinxante-Quatre",
  	"postcode": "B42 1QZ",
  	"modeOfTransport": {
  		"type": "bike",
  		"speed": 15.5
  	}
	},
	{
		"name": "Pavel Smirnoff",
		"postcode": "B69 1EQ",
		"modeOfTransport": {
			"type": "bike",
			"speed": 15.5
		}
	},
	{
		"name": "Juan Stella",
		"postcode": "B18 4DL",
		"modeOfTransport": {
			"type": "car",
			"speed": 15.5
		}
	}
]
const candidatesComplex = [
  {
		"name": "Agnezka Seize-Soinxante-Quatre",
		"postcode": "B42 1QZ",
		"modeOfTransport": {
			"type": "bike",
			"speed": 15.5
		}
	},
	{
		"name": "Pavel Smirnoff",
		"postcode": "B69 1EQ",
		"modeOfTransport": {
			"type": "bike",
			"speed": 15.5
		}
	},
	{
		"name": "Juan Stella",
		"postcode": "B18 4DL",
		"modeOfTransport": {
			"type": "car",
			"speed": 15.5
		}
  },
  {
    "name": "Jacques Desperados",
    "postcode": "B9 5AA"
  }
]

describe ('utilities', () => {
  describe ('groupBy(array, callback)', () => {
    it ('array will be filtered in an object having properties keys set to what callback returns', () => {

      const results = utilities.groupBy(candidates, candidate => candidate.modeOfTransport.type)
      expect(Object.keys(results)).toEqual(['bike', 'car'])
      expect(results.bike[0].name).toEqual('Agnezka Seize-Soinxante-Quatre')
    })
    describe('with complex data structures', () => {
      it ('will still be able to return a result with undefined values', () => {

        const results = utilities.groupBy(candidatesComplex, candidate =>
          'modeOfTransport' in candidate ? candidate.modeOfTransport.type : undefined
        )
        expect(Object.keys(results)).toEqual(['bike', 'car', 'undefined'])
        expect(results.bike[0].name).toEqual('Agnezka Seize-Soinxante-Quatre')
        expect(results.undefined[0].name).toEqual('Jacques Desperados')
      })
    })
  })
})
