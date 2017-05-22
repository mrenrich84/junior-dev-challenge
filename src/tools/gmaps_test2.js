require('dotenv').config()

let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS_DISTANCE_MATRIX_API_KEY,
});

googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  } else {
    throw err
  }
});
