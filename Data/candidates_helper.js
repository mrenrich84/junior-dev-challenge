let utilities = require('../tools/utilities')
let dateHelpers = require('../tools/date_helpers')
let Candidates = require('../Data/candidates').Candidates
let gmapsTalker = require('../tools/gmaps_talker')

// ------- CONST
const TRANSPORT_TYPE_CANDIDATES_TO_GMAPS = Object.freeze({
  car: 'driving',
  bike: 'bicycling',
  undefined: 'transit'
})

// ------- FUNCTIONs
function getCandidatesWithTravelInfo(destination) {
  const candidatesGroupedByTransport = getCandidatesGroupedByTransport()
  const candidatesTransportTypes = Object.keys(candidatesGroupedByTransport)

  let results = []
  candidatesTransportTypes.forEach(async transportType => {
    const candidatesSet = candidatesGroupedByTransport[transportType]
    const postcodes = getCandidatesPostcode(candidatesSet)
    const nextMonday = dateHelpers.getNextMonday(new Date)
    const gmapsTransportType = TRANSPORT_TYPE_CANDIDATES_TO_GMAPS[transportType]
    const gmapsApiResponse = await gmapsTalker.callGMapsDistanceMatrix(postcodes, destination, gmapsTransportType, nextMonday)
    // console.log(transportType, gmapsApiResponse.status);
    results.push(...updateCandidatesWithTravelInfo(gmapsApiResponse, candidatesSet))
  })
  return results
}

// ------- PRIVATE
function getCandidatesGroupedByTransport() {
  return utilities.groupBy(Candidates, candidate => 'modeOfTransport' in candidate ? candidate.modeOfTransport.type : undefined)
}

function getCandidatesPostcode(candidates) {
  return candidates.map(candidate => candidate.postcode)
}

function updateCandidatesWithTravelInfo(gmapsApiResponse, candidatesOrig) {
  let candidates = []
  candidatesOrig.forEach((candidate, index) => {
    let candidateClone = JSON.parse(JSON.stringify(candidate))
    const gmapsData =  gmapsApiResponse.json.rows[index].elements[0]
    candidateClone.meters_to_client = gmapsData.distance.value
    candidateClone.seconds_to_client = gmapsData.duration.value
    candidates.push(candidateClone)
  })
  return candidates
}

// ------- EXPORT
module.exports = { getCandidatesWithTravelInfo }
