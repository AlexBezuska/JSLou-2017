## JSON Editor (temporary title)
### by [Alex Bezuska](https://twitter.com/abezuska)

##### Project started: 2017.01.06

## How it works

This is a web app that takes a two JSON files, one with items and one that defines an item (data model).

Items can be anything, blog posts, events, portfolio items etc. anything that follows the [Formly api format](#defining-your-data-model)

## How to contribute

* Check the [github issues](https://github.com/AlexBezuska/json-editor/issues) to see if any specific help is needed, there might be something that fits your skills!
* Other pull requests are always welcome, especially for errors or tyops you discover, adding cool new features to help the community.

## Instructions

### Building and running the project on your computer

* Install node (instructions for your OS here: https://nodejs.org/en/)
* Clone this repository or download the zip
* Navigate to the project in your terminal
* Run `npm install` to download the project's dependencies
* Navigate to the project in your terminal
* Run `npm run start` to start the express server, this will also [open](https://www.npmjs.com/package/open) the project in your browser automatically for you :)


### `config.json` options

* **"itemsFile"** - (string) - path to where the actual data is/will be stored, this file can start blank or use existing data, but all objects added will use the format described in `itemFile`.
ex name: `items.json`

```
[
  { "id": "1", "fullName": "January", "funFact": "I just started a band with my friends!" },
  { "id": "2", "fullName": "Pip", "funFact": "I am the prince, and you will serve me." },
  { "id": "3", "fullName": "Walibur", "funFact": "Snow feels so odd on my feet" }
]
```

* **"itemFile"** - (string) - JSON file that will act as a template (or model) for what the data in your item objects will look like. Must contain an array of objects as described in [Defining you data model](#defining-your-data-model)
* **"serverPort"** - (string) - Port you wish to run the app on, default is '4000'

### Defining your data model

Defines the item object and includes data types, names, and form field types for each item property.

**Current supported field types: `input`, `textarea`, and `option`**


** This project follows the Formly api for it's data structure. I will try to add a simplified version of "type" options and "templateOptions" here soon, but for now you can reference the [Formly api](http://docs.angular-formly.com/)**

Default file is included in `./models/item.json`

Example item properties:
```
[
  {
    "key": "id",
    "type": "input",
    "templateOptions": {
      "readonly": true,
      "label": "id"
    }
  },
  {
    "key": "fullName",
    "type": "input",
    "templateOptions": {
      "required": true,
      "label": "Full Name",
      "placeholder": "this is an input"
    }
  },
  {
    "key": "funFact",
    "type": "textarea",
    "templateOptions": {
      "label": "Fun Fact",
      "placeholder": "This is a text area."
    }
  }
]
```