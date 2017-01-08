## JSON Editor (temporary title)
### by [Alex Bezuska](https://twitter.com/abezuska)

##### Project started: 2017.01.06

## How it works

This is a web app that takes a two JSON files, one with items and one that defines an item.
items can be anything, blog posts, events etc. anything that follows this format:

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
* Run `npm run start` to start the express server
* Navigate to [localhost:1337](localhost:1337) in your browser to view the site


### `config.json` operations

* **"itemsFile"** - (string) - path to where the actual data is/will be stored, this file can start blank or use existing data, but all objects added will use the format described in `itemJson`.
ex name: `items.json`

```
[
  { "id": "1", "fullName": "January", "textarea": "I just started a band with my friends!" },
  { "id": "2", "fullName": "Pip", "textarea": "I am the prince, and you will serve me." },
  { "id": "3", "fullName": "Walibur", "textarea": "Snow feels so odd on my feet" }
]
```

* **"itemFile"** - (string) - JSON file that will act as a template (or model) for what the data in your item objects will look like. Must contain an array of objects as described in [Defining you data model](#defining-your-data)
* **"serverPort"** - (string) - Port you wish to run the app on, default is '4000'

### Defining your data model

Defines the object and includes data types, and form field types for each item.

Current supported field types: `input`, `textarea`

**Now follows the [angular-formly](http://docs.angular-formly.com/) api!**

ex name: `item.json`

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