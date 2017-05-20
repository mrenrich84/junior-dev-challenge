let dateHelpers = require('./date_helpers')

describe ('dateHelpers', () => {
  describe ('getNextMonday', () => {
    it ('returns the next Monday 9AM BST as Linux epoch in UTC+1', () => {
      const today = new Date(2017,4,19,9)
      const nextMonday = 1495440000
      const results = dateHelpers.getNextMonday(today)
      expect(results).toEqual(nextMonday)
    })
  })
})
