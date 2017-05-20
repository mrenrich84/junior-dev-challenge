let Candidates = require('../Data/candidates').Candidates
let Clients = require('../Data/locations').Clients
let gmapsTalker = require('../tools/gmaps_talker')


// ------- CONST
const TRANSPORT_TYPE_GMAPS_TO_CANDIDATES = Object.freeze({
  driving: 'car',
  bicycling: 'bike',
  transit: undefined
})


// ------- ROUTES HELPERS
// GET /clients
function getClients (req, res) {
  res.json(Clients)
}

// GET /client/:id
function getClientById (req, res) {
  const client = Clients[req.params.id]
  const candidatesWithTravelInfo = candidatesHelper.getCandidatesWithTravelInfo(client.postcode)
  res.json(createClientByIdResponse(client, candidatesWithTravelInfo))
}

// ------- EXPORTS
module.exports = { getClients, getClientById }
