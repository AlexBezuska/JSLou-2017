var uuid = require('uuid');
var fs = require('fs');
var moment = require('moment');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars');
var hbs = handlebars.create({
  helpers: {
    sortByDate: require("./helpers/sortByDate.js"),
    if_eq: require("./helpers/if_eq.js"),
    count: require("./helpers/count.js")
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


var state = {
  eventsFile : "./data/events.json",
  events: require("./data/events.json"),
  eventModel : require("./models/event-model.json"),
  eventDefaults : require("./models/event-defaults.json"),
  task: "create"
}

fixIds(state);

app.get('/', function (req, res) {
  res.render('home', {layout: 'main'});
});

app.get('/manage-events', function (req, res, next) {
  var eventId = req.query.id;
  if (eventId) {
    if (eventExists(state, eventId)) {
      state.task = "edit";
      fillDefaults(state, selectEvent(state, eventId));
    }
  } else {
    state.task = "create";
    fillDefaults(state, state.eventDefaults);
  }

  res.render('manage-events', {
    editingEvent: req.params.editingEvent,
    addEvent: state.eventModel,
    events: state.events,
    state: state,
    layout: 'main'
  });

});


app.post('/manage-events/submit', function(req, res, next) {
  writeEventsFile (state.eventsFile, addEvent(state, req.body));
  res.redirect('/manage-events');
});

app.get('/delete-event', function(req, res, next) {
  var eventId = req.query.id;
  writeEventsFile (state.eventsFile, deleteEvent(state, eventId) );
  res.redirect('/manage-events');
});


app.listen(1337, function() {
  console.log('Server running at http://127.0.0.1:1337/');
});


function fillDefaults(state, eventObject){
  if(typeof eventObject === "object"){
    Object.keys(eventObject).forEach(function(key) {
      Object.keys(state.eventModel).forEach(function(key) {
        state.eventModel[key].value = eventObject[key];
      });
    });
  }
}

function eventExists(state, id){
  if (id === ""){
    return false;
  }
  return cleanJSON(state.events).filter(
    obj => obj.id === id
  );
}

function selectEvent(state, id){
  return cleanJSON(state.events).filter(
    obj => obj.id === id
  )[0];
}

function deleteEvent(state, id){
  state.events = cleanJSON(state.events).filter(
    obj => obj.id !== id
  );
  console.log("Delete event with id:", id);
  return state.events;
}

function cleanJSON(input){
  var newArray = [];
  for(var i = 0; i < input.length; i ++){
    newArray.push(input[i]);
  }
  return newArray;
}

function addEvent(state, newEvent){
  if (eventExists(state, newEvent.id)){
    var storeId = newEvent.id;
    deleteEvent(state, newEvent.id);
    console.log("storeId", storeId);
    newEvent.id = storeId;
    console.log("Updated existing event with id:", newEvent.id);
  }else{
    newEvent.id = uuid();
    console.log("Created new event with id:", newEvent.id);
  }

  var newArray = cleanJSON(state.events);
  newArray.unshift(newEvent);
  state.events = newArray;
  return newArray;
}

function fixIds(state){
  var newArray = cleanJSON(state.events);
  var idsWereAdded = false;
  for (var i = 0; i < newArray.length; i++) {
    if (!newArray[i].id) {
      idsWereAdded = true;
      var uu = uuid();;
      newArray[i].id = uu;
    }
  }
  if (idsWereAdded) {
    writeEventsFile (state.eventsFile, newArray);
  }
}

function writeEventsFile (outputFile, data) {
  var data = JSON.stringify(data, null, 2);
  if (data){
    fs.writeFile(outputFile, data, 'utf-8', function(err) {
      if(err) { return console.log(err); }
      console.log("\n -- file written --\n");
    });
  }else {
    console.log('error with data');
  }
}
