//Master Page file called data.txt
//Write new notes to disk every 1 min
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
    res.writeHead(200, {"Content-Type": "text/html"});
    var desFile = fs.readFileSync('index.txt').toString();
    var fileArray = desFile.split('\n');
    for(var i=0; i<fileArray.length; i++){
      res.write(fileArray[i]);
      if(i == 7){
        res.write('<a href="#">' + queries[contentList[0]] + '</a>');
      }
      //SEND A DIV WITH A SPECIAL ID CONTAINING THE SERVER INFORMATION. THE WEBSITE CAN THEN PROCESS THE INFORMATION IN THE DIV AND HIDE THE DIV.
    }
    res.end();
});

app.post('/indexAddition', function(req, res){
    newData.push(req.body.text);
    console.log("Text Recieved: " + req.body.text);
    res.sendFile('clientResources/index.html', { root: __dirname + "/" } );
});

console.log("Service Initialized...");

//Data management

var rawData = fs.readFileSync('data/data.txt');
var dataString = rawData.toString();
var readData = dataString.split('\n');

var newData = [];

//Clocking

setInterval(function(){
    writeToDisk(newData);
}, 60000);

function writeToDisk(data){
    console.log("Writing " + data.length + " Chunks to disk");
    for(var i=0; i< data.length; i++){
        console.log("Writing " + (i/data.length)*100 + "% of " + data.length + " Chunks completed");
        fs.appendFileSync('data/data.txt', data[i] + '\n');
    }
    console.log("Write completed, clearing console in 15 sec");
    setTimeout(function(){
        console.clear();
        console.log("System OK");
    }, 15000);
    
}