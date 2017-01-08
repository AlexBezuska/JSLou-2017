var uuid = require('uuid');
var fs = require('fs');
var moment = require('moment');
var open = require('open');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars');
var hbs = handlebars.create({
  helpers: {
    ifEqual: require("./helpers/ifEqual.js"),
    count: require("./helpers/count.js")
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

var config = require('./config.json');

var dataFile = [];
try{
  var dataFile = require(config.dataFile);
}catch(e){}

var state = {
  dataFile : config.dataFile,
  data: dataFile,
  formModel : require(config.formFile),
  itemDefaults : require(config.formFile),
  task: "create"
}

fixIds(state);

app.get('/', function (req, res, next) {
  var itemId = req.query.id;
  if (itemId) {
    if (itemExists(state, itemId)) {
      state.task = "edit";
      var selecteditem = selectitem(state, itemId);
      state.idCurrentlyEditing = selecteditem.id;
      state.formModel = smashPostBodyIntoModel(state.formModel, selecteditem);
    } else {
      console.log("invalid item id", itemId);
      fillDefaults(state);
    }
  } else {
    fillDefaults(state);
  }

  res.render('main', {
    editingitem: req.params.editingitem,
    formModel: state.formModel,
    data: state.data,
    state: state,
    serverPort: config.serverPort,
    layout: 'main'
  });

});

app.post('/submit', function(req, res, next) {
  console.log("req.body",req.body);
  writeDataFile (state.dataFile, additem(state, req.body));
  res.redirect('/');
});

app.get('/delete', function(req, res, next) {
  var itemId = req.query.id;
  writeDataFile (state.dataFile, deleteitem(state, itemId) );
  res.redirect('/');
});


app.listen(parseFloat(config.serverPort), function() {
  var url = 'http://127.0.0.1:'+ config.serverPort;
  console.log('Server running at', url);
  open(url + '/');
});

function fillDefaults(state){
  state.task = "create";
  var formModel = state.formModel;
  for (var i = 0; i < formModel.length; i++) {
    formModel[i].data = formModel[i].templateOptions.placeholder || "";
  }
  state.formModel = formModel;
}

function itemExists(state, id){
  if (id === ""){
    return false;
  }
  return cleanJSON(state.data).filter(
    obj => obj.id === id
  ).length > 0;
}

function selectitem(state, id){
  return cleanJSON(state.data).filter(
    obj => obj.id === id
  )[0];
}

function deleteitem(state, id){
  state.data = cleanJSON(state.data).filter(
    obj => obj.id !== id
  );
  console.log("Delete item with id:", id);
  return state.data;
}

function cleanJSON(input){
  var newArray = [];
  for(var i = 0; i < input.length; i ++){
    newArray.push(input[i]);
  }
  return newArray;
}

function smashPostBodyIntoModel(model, postBody){
  var newModel = model;
  for (var i = 0; i < newModel.length; i++) {
    newModel[i].data = postBody[model[i].key];
  }
  return newModel;
}

function additem(state, thisitem){
  smashPostBodyIntoModel(state.formModel, thisitem);
  if (itemExists(state, thisitem.id)){
    var storeId = thisitem.id;
    deleteitem(state, thisitem.id);
    thisitem.id = storeId;
    console.log("Updated existing item with id:", thisitem.id);
  }else{
    thisitem.id = uuid();
    console.log("Created new item with id:", thisitem.id);
  }

  var newArray = cleanJSON(state.data);
  newArray.unshift(thisitem);
  state.data = newArray;
  return newArray;
}

function fixIds(state){
  var newArray = cleanJSON(state.data);
  var idsWereAdded = false;
  for (var i = 0; i < newArray.length; i++) {
    if (!newArray[i].id) {
      idsWereAdded = true;
      var uu = uuid();;
      newArray[i].id = uu;
    }
  }
  if (idsWereAdded) {
    writeDataFile (state.dataFile, newArray);
  }
}

function writeDataFile (outputFile, data) {
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
