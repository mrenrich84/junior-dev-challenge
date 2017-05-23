let utilities = require('../../tools/utilities')
let dateHelpers = require('../../tools/date_helpers')
let Candidates = require('./candidates')
let gmapsTalker = require('../../tools/gmaps_talker')

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
  let promiseRegistry = []
  candidatesTransportTypes.forEach(transportType => {
    const candidatesSet = candidatesGroupedByTransport[transportType]
    const postcodes = getCandidatesLocation(candidatesSet)
    const nextMonday = dateHelpers.getNextMonday(new Date)
    const gmapsTransportType = TRANSPORT_TYPE_CANDIDATES_TO_GMAPS[transportType]
    let gmapsCallPromise = gmapsTalker.callGMapsDistanceMatrix(postcodes, destination, gmapsTransportType, nextMonday)
    .then(gmapsApiResponse => updateCandidatesWithTravelInfo(gmapsApiResponse, candidatesSet))
    // console.log(transportType, gmapsApiResponse.status);
    promiseRegistry.push(gmapsCallPromise)
  })
  return Promise.all(promiseRegistry)
  // .then(() => {
    // console.log('getCandidatesWithTravelInfo', results)
    // return results
  // })
}

// ------- PRIVATE
function getCandidatesGroupedByTransport() {
  return utilities.groupBy(Candidates, candidate => 'modeOfTransport' in candidate ? candidate.modeOfTransport.type : undefined)
}

function getCandidatesLocation(candidates) {
  return candidates.map(candidate => candidate.location)
}

function updateCandidatesWithTravelInfo(gmapsApiResponse, candidatesOrig) {
  let candidates = []
  // console.log('updateCandidatesWithTravelInfo', gmapsApiResponse);
  candidatesOrig.forEach((candidate, index) => {
    let candidateClone = JSON.parse(JSON.stringify(candidate))
    const gmapsData =  gmapsApiResponse.json.rows[index].elements[0]
    console.log(JSON.stringify(gmapsApiResponse, null, 4));
    candidateClone.meters_to_client = gmapsData.distance.value
    candidateClone.seconds_to_client = gmapsData.duration.value
    candidates.push(candidateClone)
  })
  return candidates
}

// ------- EXPORT
module.exports = { getCandidatesWithTravelInfo }
