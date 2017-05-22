require('dotenv').config()

let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS_DISTANCE_MATRIX_API_KEY,
  Promise: Promise
});

// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });

(async () => {
  let response = await googleMapsClient.distanceMatrix({
    origins: [
      'e15jj', 'b178hd', 'b218eu'
    ],
    destinations: [
      'b178eu'
    ],
    units: 'metric',
    region: 'uk',
    mode: 'transit',
    departure_time: parseInt(new Date(2017,4,19,9).getTime() / 1000)
  }).asPromise()
  response.json.rows.forEach(row => {
    console.log("New row");
    console.log(row.elements)
    // row.forEach(element => {
    //   console.log(element)
    // })
  })
  console.log(response);
}) ()

console.log("it's asynchronous!!!!");
