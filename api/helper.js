let Candidates = require('../Data/candidates').Candidates
let Clients = require('../Data/locations').Clients
let gmapsTalker = require('../tools/gmaps_talker')
let candidatesHelper = require('../Data/candidates_helper')

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
