function groupBy (array, callback) {
  let results = {}
  array.forEach(obj => {
    const key = callback(obj)
    results[key] = results[key] ||  []
    results[key].push(obj)
  })

  return results
}


module.exports = { groupBy  }
