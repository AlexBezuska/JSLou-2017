var uuid = require('uuid');
var fs = require('fs');
var moment = require('moment');
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

var itemsFile = [];
try{
  var itemsFile = require(config.itemsFile);
}catch(e){}

var state = {
  itemsFile : config.itemsFile,
  items: itemsFile,
  itemModel : require(config.itemFile),
  itemDefaults : require(config.itemFile),
  task: "create"
}

fixIds(state);

app.get('/', function (req, res) {
  res.render('home', {layout: 'main'});
});

app.get('/manage-items', function (req, res, next) {
  var itemId = req.query.id;
  if (itemId) {
    if (itemExists(state, itemId)) {
      state.task = "edit";
      var selecteditem = selectitem(state, itemId);
      //console.log("selecteditem", selecteditem);
      state.idCurrentlyEditing = selecteditem.id;
        state.itemModel = smashPostBodyIntoModel(state.itemModel, selecteditem);
        console.log("state.itemModel",state.itemModel);
    } else {
      console.log("invalid item id", itemId);
    }
  } else {
    state.task = "create";
    fillDefaults(state);
  }

  res.render('manage-items', {
    editingitem: req.params.editingitem,
    additem: state.itemModel,
    items: state.items,
    state: state,
    serverPort: config.serverPort,
    layout: 'main'
  });

});

app.post('/manage-items/submit', function(req, res, next) {
  writeitemsFile (state.itemsFile, additem(state, req.body));
  res.redirect('/manage-items');
});

app.get('/delete-item', function(req, res, next) {
  var itemId = req.query.id;
  writeitemsFile (state.itemsFile, deleteitem(state, itemId) );
  res.redirect('/manage-items');
});


app.listen(parseFloat(config.serverPort), function() {
  console.log('Server running at http://127.0.0.1:'+ config.serverPort + "/");
});

function fillDefaults(state){
  var itemModel = state.itemModel;
  for (var i = 0; i < itemModel.length; i++) {
    itemModel[i].data = itemModel[i].templateOptions.placeholder || "";
  }
  state.itemModel = itemModel;
}

function itemExists(state, id){
  if (id === ""){
    return false;
  }
  return cleanJSON(state.items).filter(
    obj => obj.id === id
  ).length > 0;
}

function selectitem(state, id){
  return cleanJSON(state.items).filter(
    obj => obj.id === id
  )[0];
}

function deleteitem(state, id){
  state.items = cleanJSON(state.items).filter(
    obj => obj.id !== id
  );
  console.log("Delete item with id:", id);
  return state.items;
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
    console.log(newModel[i].data);
  }
  return newModel;
}


function additem(state, thisitem){
  smashPostBodyIntoModel(state.itemModel, thisitem);
  if (itemExists(state, thisitem.id)){
    var storeId = thisitem.id;
    deleteitem(state, thisitem.id);
    thisitem.id = storeId;
    console.log("Updated existing item with id:", thisitem.id);
  }else{
    thisitem.id = uuid();
    console.log("Created new item with id:", thisitem.id);
  }

  var newArray = cleanJSON(state.items);
  newArray.unshift(thisitem);
  state.items = newArray;
  return newArray;
}

function fixIds(state){
  var newArray = cleanJSON(state.items);
  var idsWereAdded = false;
  for (var i = 0; i < newArray.length; i++) {
    if (!newArray[i].id) {
      idsWereAdded = true;
      var uu = uuid();;
      newArray[i].id = uu;
    }
  }
  if (idsWereAdded) {
    writeitemsFile (state.itemsFile, newArray);
  }
}

function writeitemsFile (outputFile, data) {
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
