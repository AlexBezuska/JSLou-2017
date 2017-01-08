## JSON Editor (temporary title)
### by [Alex Bezuska](https://twitter.com/abezuska)

##### Project started: 2017.01.06

## How it works

This is a web app that takes a two JSON files, one with data in the form of an array of JSON object, and one that defines a form for creating those objects.

The resulting objects can be used for anything: blog posts, events, portfolio items etc.

The JSON to create the form uses the [Formly api format](#defining-your-data-model) to keep things consistent.

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

* **"dataFile"** - (string) - path to where the actual data is/will be stored, this file can start blank or use existing data, but all objects added will use the format described in `formFile`.
ex name: `items.json`

```
[
  {
    "id": "f35d9e3d-4838-4bbb-8b38-3b3e8484128b",
    "firstName": "January",
    "age": "1",
    "emailAddress": "january@januarybear.me",
    "funFact": "I just started a band with my friends!",
    "transportation": "Scooter",
    "birthday": "2016-01-01"
  },
  {
    "id": "d4f8913a-9d4a-4ba1-85cd-d20c79617d39",
    "firstName": "Walibur",
    "age": "1",
    "emailAddress": "walibur@chickenhouse.com",
    "funFact": "I don't know anything!",
    "transportation": "Sport Utility Vehicle",
    "birthday": "2016-06-14"
  },
  {
    "id": "fcb750f1-1211-4121-83aa-d9cd9d8e04c0",
    "firstName": "Pip",
    "age": "10",
    "emailAddress": "pip@balthasar.com",
    "funFact": "I am the prince, and you will serve me.",
    "transportation": "Hot Air Baloon",
    "birthday": "2006-03-20"
  }
]
```

* **"formFile"** - (string) - JSON file that will act as a template for the form *and* the data objects. Must contain an array of objects as described in [Defining you data model](#defining-your-data-model)
* **"serverPort"** - (string) - Port you wish to run the app on, default is '4000'

### Building your form

In the JSON file you linked to in 'config.json' > `formFile` you can customize and configure your form. Think of it as a big list of fields you want to use.
for example if you wanted to create a form that asks for name, age, and a fun fact it would start like this (id is required and must be in all forms):

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
    "key": "name",
    "type": "input",
    "templateOptions": {
      "type": "text",
      "label": "Name"
    }
  },
  {
    "key": "age",
    "type": "input",
    "templateOptions": {
      "type": "number",
      "label": "Age"
    }
  },
  {
    "key": "funFact",
    "type": "textarea",
    "templateOptions": {
      "label": "Fun fact about yourself"
    }
  }
]
```
 You can also specify placeholder text for most fields on your form, for example:


 ##### Adding place-holder text

 Some fields will allow placeholder text to be added using the `"placeholder"` property in `"templateOptions"`:
 ```
 {
   "key": "name",
   "type": "input",
   "templateOptions": {
     "type": "text",
     "label": "Name",
     "placeholder": "Your full name goes here"
   }
 },
 ```

 ##### Making fields required

 To make a field required add the `"required": true` property in `"templateOptions"`:
 ```
 {
   "key": "name",
   "type": "input",
   "templateOptions": {
     "type": "text",
     "label": "Name",
     "required": true
   }
 },
 ```

 ##### Providing helper text or description for a field

 To add helper text use the `"description"` property in `"templateOptions"`:
 ```
 {
   "key": "name",
   "type": "input",
   "templateOptions": {
     "type": "text",
     "label": "Name",
     "description": "This is simply a place to write your name."
   }
 },
 ```

 ##### Read only fields

 This is useful for working with existing data that you want to see in your form but not change, use the `"readonly": true` property in `"templateOptions"`:
 ```
 {
   "key": "id",
   "type": "input",
   "templateOptions": {
     "readonly": true,
     "label": "id"
   }
 },
 ```


**Current supported field types: `input`, `textarea`, and `option`**

** This project follows the Formly api for it's data structure. I will try to add a simplified version of "type" options and "templateOptions" here soon, but for now you can reference the [Formly api](http://docs.angular-formly.com/)**