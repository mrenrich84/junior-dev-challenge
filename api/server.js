let express = require('express')
let app = express()
let port = 8000
let Candidates = require('../Data/candidates').Candidates
let Clients = require('../Data/locations').Clients

app.get("/", (req, res) => res.json({message: "Working!"}));
app.get("/clients", (req, res) => res.json(Clients))

let server_handle = app.listen(port);
console.log("API SERVER: Listening on port " + port);

module.exports = server_handle
