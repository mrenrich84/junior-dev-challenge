let express = require('express')
let app = express()
let port = 8000
let helper = require('./helper')

app.get("/", (req, res) => res.json({message: "Working!"}));
app.get("/clients", helper.getClients)
app.get("/client/:id", helper.getClientById)

let server_handle = app.listen(port);
console.log("API SERVER: Listening on port " + port);

module.exports = server_handle
