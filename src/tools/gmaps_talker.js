require('dotenv').config()

let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS_DISTANCE_MATRIX_API_KEY,
  Promise: Promise
});

function callGMapsDistanceMatrix(origins, destination, transport_type, departure_time) {
  console.log('CALLING GMAPS API!!!!');
  return  googleMapsClient.distanceMatrix({
    origins: origins,
    destinations: [
      destination
    ],
    mode: transport_type,
    units: 'metric',
    region: 'uk',
    departure_time: departure_time
  }).asPromise()
}

module.exports = { callGMapsDistanceMatrix }
