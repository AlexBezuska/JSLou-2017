var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var fs = require('fs');
var app = express();
var hbs = handlebars.create({
  helpers: {
    sortByDate: require("./helpers/sortByDate.js"),
    if_eq: require("./helpers/if_eq.js")
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

var addEventJson = require("./data/add-event.json");

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());
app.get('/', function (req, res) {
  res.render('home', {layout: 'main'});

});

function addEventPage(res){
  res.render('add-event', {
    addEvent: addEventJson,
    events: require("./data/events.json"),
    layout: 'main'
  });
}
app.get('/add-event', function (req, res) {
  addEventPage(res)
});

app.post('/add-event', function(req, res) {
  addEventPage(res);
  addEvent (res, req.body, "./data/events.json");
});

app.listen(1337, function() {
  console.log('Server running at http://127.0.0.1:1337/');
});





function addEvent (res, newEvent, outputFile) {
  var allEvents = require("./data/events.json");
  console.log(typeof allEvents,  allEvents.length);
    var newArray = [];
  for(var i = 0; i < allEvents.length; i ++){
    newArray.push(allEvents[i]);
  }
  newArray.unshift(newEvent);


  fs.writeFile(outputFile, JSON.stringify(newArray, null, 2) , 'utf-8', function(err) {
    if(err) { return console.log(err); }
    console.log("\n -- file written --\n");
  });
}