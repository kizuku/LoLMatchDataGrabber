// server.js -- handles API call

var dotenv = require("dotenv").config();
var express = require("express");
var serveStatic = require("serve-static");
const axios = require("axios");
var port = process.env.PORT || 5000;

const apiUrl = process.env.apiUrl;
const apiKey = process.env.apiKey;

app = express();
app.use(serveStatic(__dirname + "/dist"));

axios.defaults.headers.common["X-Riot-Token"] = apiKey;

app.get('/api', function(req, res) {
    var matchid = req.headers.matchid;

    axios.get(apiUrl + matchid).then(result => {
        object = result;
        res.send(object.data);
    })
})

app.listen(port);
console.log("server started on port " + port);