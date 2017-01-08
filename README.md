## JSON Editor (temporary title)
### by [Alex Bezuska](https://twitter.com/abezuska)

##### Project started: 2017.01.06

## How it works

This is a web app that takes a two JSON files, one with items and one that defines an item.
items can be anything, blog posts, events etc. anything that follows this format:

**itemJson**

Defines the object and includes data types, and form field types for each item.

ex name: `item.json`

```
{
  "id": {
    "label": "id",
    "type": "private"
  },
  "title": {
    "label": "Event Title",
    "type": "text",
    "element": "input"
  },
  "description": {
    "label": "Description",
    "element": "textarea",
    "type": "textarea"
  }
  ...
}
```

**itemsJson**

This is where the actual data is stored, this file can start blank or use existing data, but all object added will be using the format described in itemsJson.
ex name: `items.json`

```
[
  { "id": "1", "title": "Thing 1", "description": "..." },
  { "id": "2", "title": "Thing 2", "description": "..." },
  { "id": "3", "title": "Thing 3", "description": "..." },
  ...
]
```

## How to contribute

* Check the [github issues](https://github.com/AlexBezuska/json-editor/issues) to see if any specific help is needed, there might be something that fits your skills!
* Other pull requests are always welcome, especially for errors or tyops you discover, adding cool new features to help the community.

## Building the project on your computer

* Install node (instructions for your OS here: https://nodejs.org/en/)
* Clone this repository or download the zip
* Navigate to the project in your terminal
* Run `npm install` to download the project's dependencies
* Navigate to the project in your terminal
* Run `npm run start` to start the express server
* Navigate to [localhost:1337](localhost:1337) in your browser to view the site