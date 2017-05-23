let Candidates = require('./models/candidates')
let Clients = require('./models/clients')
let gmapsTalker = require('../tools/gmaps_talker')
let candidatesHelper = require('./models/candidates_helper')

// ------- ROUTES HELPERS
// GET /clients
function getClients (req, res) {
  res.json(Clients)
}

// GET /client/:id
function getClientById (req, res) {
  const client = Clients[req.params.id]
  candidatesHelper.getCandidatesWithTravelInfo(client.postcode)
  .then( candidatesWithTravelInfoGrouped => {
    // console.log(candidatesWithTravelInfo);
    let candidatesWithTravelInfo = []
    const groups = [0,1,2]
    groups.forEach (n => candidatesWithTravelInfo.push(...candidatesWithTravelInfoGrouped[n]))
    console.log(candidatesWithTravelInfo)

    res.json({
      client: client,
      candidates: candidatesWithTravelInfo
    })
  })
}

// ------- EXPORTS
module.exports = { getClients, getClientById }
