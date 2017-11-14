# Graphcool Vue.js Kickstart

## Description
This is a graphcool starter kit utilizing vue for the front-end.

This project's front-end utilizes:
- ES6
- Vue (front-end framework)
- Vuex (state management)
- Vue Loader (single page components)
- Vue-Router (routing)
- Pug (templating)
- Webpack (bundling)

## Get started
1. Clone repo
2. cd to src directory
3. Run:
    > npm install

    > webpack 

    or
    
    > npm run start:dev

## Getting started using Graphcool
1. Install graphcool CLI
    > npm install -g graphcool@next
2. Initialize new project with
    > graphcool init

### Web Socket Plugin
A custom vue plugin was implemented in this project for integrating websockets with vue to wire up graphcool subscriptions. This plugin is a WIP - expect jankyness with its usage, for now.

A working example with this plugin as part of this project. TODOs that are added are added to the list through a subscription to graphcool via the plugin.

### Using Graphcool

#### Project configuration
project.graphcool file should be placed within server directory

Example for this project:
```
# project: [project id]
# version: 2

type User @model {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
}

type File @model {
  id: ID! @isUnique
  createdAt: DateTime!
  updatedAt: DateTime!
  contentType: String!
  name: String!
  secret: String! @isUnique
  size: Int!
  url: String! @isUnique
}

type Task @model {
  id: ID! @isUnique
  text: String!
  done: Boolean!
}
```

src/js/graphql directory should contain a graphql.json file with the following properties:

```   
 {
    "useDevTools": [true or false],
    
    "simpleApiEndpoint": "[graphcool simple api endpoint]",
    
    "relayApiEndpoint": 
    "[graphcool relay api endpoint]",
    
    "subscriptionsEndpoint": "[graphcool subscription endpoint]"
 }
```

These files can be easily created with the graphcool CLI 

#### Update schemas and delete types via graphcool CLI

Updating schema
1. Update type(s) in project.graphcool
2. Use push to update schema
    > graphcool push 

Deleting types
1. Delete type(s) in project.graphcool
2. Force push to delete type (removes data)
    > graphcool push --force
