# Starter Kit - Graphcool

## Description
This is a clean graphcool starter kit utilizing vue for the front-end.

This project's front-end utilizes:
- ES6
- Vue (front-end framework)
- Vuex (state management)
- Vueify (single page components)
- Vue-Router (routing)
- Pug (templating)
- Browserify (bundling)
- Gulp (task runner)

## Get started
1. Clone repo
2. cd to src directory
3. Run:
    > npm install
    
    > http-server ../public start

## Getting started using Graphcool
1. Install graphcool CLI
    > npm install -g graphcool@next
2. cd to /server
3. Initialize new project with
    > graphcool init

### Using Graphcool

#### Updating schema
1. Update type(s) in project.graphcool
2. Use push to update schema
    > graphcool push 

#### Deleting types
1. Delete type(s) in project.graphcool
2. Force push to delete type (removes data)
    > graphcool push --force


## Running local web server
    1. cd to src
    2. > http-server ../public start
    3. runs on localhost:8080

## Building JS and CSS

### Building js to public
    1. cd to src
    2. > gulp scripts:deploy

### Building scss to public
    1. cd to src
    2. > gulp styles:deploy

### Building everything to public
    1. cd src
    2. > gulp fire:everything

### Watching js
    1. cd src
    2. > gulp scripts:watch

### Watch styles
    1. cd src
    2. > gulp styles:watch

### Watch everything
    1. cd src
    2. > gulp watch:everything