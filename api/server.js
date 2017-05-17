let express = require('express')
let app = express()
let port = 8000
let data = {
  candidates: require('../Data/candidates').Candidates,
  clients: require('../Data/locations').Clients
}

app.get("/", (req, res) => res.json({message: "Working!"}));
app.get("/clients", (req, res) => res.json(data.clients))

let server = app.listen(port);
console.log("Listening on port " + port);

module.exports = server
