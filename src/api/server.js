let express = require('express')
let app = express()
let helper = require('./helper')

const API_PORT = require('../shared/config').API_PORT

app.get("/", (req, res) => res.json({message: "Working!"}));
app.get("/clients", helper.getClients)
app.get("/client/:id", helper.getClientById)

let server_handle = app.listen(API_PORT);
console.log("API SERVER: Listening on port " + API_PORT);

module.exports = server_handle
