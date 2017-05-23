let candidates_file = './candidates.json'
let Candidates = require(candidates_file)
let client_file = './clients.json'
let Clients = require(client_file)
let gmaps_talker = require('../../tools/gmaps_talker')
var fs = require('fs')


let updateModel = (models, output) => {
  let promiseRegistry = []

  // let test_model = [models[0]]
  // test_model.forEach((model) =>  {
  models.forEach((model) =>  {
    let gmapsCall = gmaps_talker.callGMapsGeocoder(model.postcode)
    promiseRegistry.push(gmapsCall)
    gmapsCall.then(location => model.location = location)
  })

  Promise.all(promiseRegistry).then( (values) => {
    // console.log(values);
    // console.log(JSON.stringify(models, null, 4))
    fs.writeFile(output, JSON.stringify(models, null, 4), 'utf-8', function(err) {
    	if (err) throw err
    	console.log('Done!')
    })
  })

}

updateModel(Clients, client_file)
updateModel(Candidates, candidates_file)
