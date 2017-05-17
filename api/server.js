let express = require('express')
let app = express()
let port = 8000

app.get("/", (req, res) => res.json({message: "Working!"}));
let server = app.listen(port);
console.log("Listening on port " + port);

module.exports = server
