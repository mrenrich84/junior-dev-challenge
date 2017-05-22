require('dotenv').config()
const LOG_MSG = 'CALLING GMAPS API!!!!'

let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS_DISTANCE_MATRIX_API_KEY,
  Promise: Promise
});

function callGMapsDistanceMatrix(origins, destination, transport_type, departure_time) {
  console.log(LOG_MSG)
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

async function callGMapsGeocoder(postcode) {
  console.log(LOG_MSG)
  let response = await googleMapsClient.geocode({
    components: {postal_code: postcode, country: 'UK'},
  }).asPromise()
  const location = response.json.results[0].geometry.location
  return [location.lat, location.lng]

  // console.log(JSON.stringify(response, null, 4))
  // {
  //     "status": 200,
  //     "headers": {
  //         "content-type": "application/json; charset=UTF-8",
  //         "date": "Mon, 22 May 2017 23:24:38 GMT",
  //         "expires": "Tue, 23 May 2017 23:24:38 GMT",
  //         "cache-control": "public, max-age=86400",
  //         "access-control-allow-origin": "*",
  //         "server": "mafe",
  //         "x-xss-protection": "1; mode=block",
  //         "x-frame-options": "SAMEORIGIN",
  //         "alt-svc": "quic=\":443\"; ma=2592000; v=\"37,36,35\"",
  //         "accept-ranges": "none",
  //         "vary": "Accept-Language,Accept-Encoding",
  //         "connection": "close"
  //     },
  //     "json": {
  //         "results": [
  //             {
  //                 "address_components": [
  //                     {
  //                         "long_name": "B4 7XG",
  //                         "short_name": "B4 7XG",
  //                         "types": [
  //                             "postal_code"
  //                         ]
  //                     },
  //                     {
  //                         "long_name": "Curzon Street",
  //                         "short_name": "Curzon St",
  //                         "types": [
  //                             "route"
  //                         ]
  //                     },
  //                     {
  //                         "long_name": "Birmingham",
  //                         "short_name": "Birmingham",
  //                         "types": [
  //                             "postal_town"
  //                         ]
  //                     },
  //                     {
  //                         "long_name": "West Midlands",
  //                         "short_name": "West Midlands",
  //                         "types": [
  //                             "administrative_area_level_2",
  //                             "political"
  //                         ]
  //                     },
  //                     {
  //                         "long_name": "England",
  //                         "short_name": "England",
  //                         "types": [
  //                             "administrative_area_level_1",
  //                             "political"
  //                         ]
  //                     },
  //                     {
  //                         "long_name": "United Kingdom",
  //                         "short_name": "GB",
  //                         "types": [
  //                             "country",
  //                             "political"
  //                         ]
  //                     }
  //                 ],
  //                 "formatted_address": "Curzon St, Birmingham B4 7XG, UK",
  //                 "geometry": {
  //                     "location": {
  //                         "lat": 52.4827934,
  //                         "lng": -1.885955
  //                     },
  //                     "location_type": "APPROXIMATE",
  //                     "viewport": {
  //                         "northeast": {
  //                             "lat": 52.48414238029149,
  //                             "lng": -1.884606019708498
  //                         },
  //                         "southwest": {
  //                             "lat": 52.4814444197085,
  //                             "lng": -1.887303980291502
  //                         }
  //                     }
  //                 },
  //                 "place_id": "ChIJGcLBcYO8cEgRACCcMGcGaX0",
  //                 "types": [
  //                     "postal_code"
  //                 ]
  //             }
  //         ],
  //         "status": "OK"
  //     }
  // }

}

module.exports = { callGMapsDistanceMatrix, callGMapsGeocoder }
