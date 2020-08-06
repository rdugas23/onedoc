//Master Page file called data.txt
//Write new notes to disk every 5 mins
//Cache changes in list and then clear to disk on write to disk queue

//Serve Client Page
console.log("Starting services...");

var path = require('path');
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
const fs = require('fs');

var htmlPath = path.join(__dirname, 'clientResources');
app.use(express.static(htmlPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

app.listen(port, function() {
  console.log("Listening on " + port);
});

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname + "/" } );
});

console.log("Service Initialized...");

//Read disk file into list