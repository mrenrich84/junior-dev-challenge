let Candidates = require('./models/candidates').Candidates
let Clients = require('./models/locations').Clients
let gmapsTalker = require('../tools/gmaps_talker')
let candidatesHelper = require('./models/candidates_helper')

// ------- ROUTES HELPERS
// GET /clients
function getClients (req, res) {
  res.json(Clients)
}

// GET /client/:id
async function getClientById (req, res) {
  const client = Clients[req.params.id]
  const candidatesWithTravelInfo = await candidatesHelper.getCandidatesWithTravelInfo(client.postcode)
  res.json({
    client: client,
    candidates: candidatesWithTravelInfo
  })
}

// ------- EXPORTS
module.exports = { getClients, getClientById }
