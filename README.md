# Instructions for running Reverie's backend
1. Create database locally by typing in `psql` in the terminal
2. Then type `CREATE DATABASE robots;` then `CREATE DATABASE robots_test`
3. Clone down this repo
4. Type `npm install` to install all dependencies
5. Type `knex migrate:latest` then `knex migrate:latest --env=test` in terminal to run schemas
6. Type `knex seed:run` and `knex seed:run --env=test` to seed the development and test databases
7. Type `node server.js` to start the server
8. Run the [front end repo]('https://github.com/stevenleelawson/reverie-front-end-lawson') by cloning, typing `npm install` and then `npm start`. You will be prompted to run the front end on localhost:3001. Then type `y` and hit enter.
9. Enjoy Lawson's Amazing Robots

# Reverie - Inventory Tracking App
Dr. Robert Ford has hired Riverstone to develop an application for
managing his inventory of robots. There are certain characteristics that he
would like to track for all robots. The app should have a front-end and a
back-end component.

## Backend

The backend service should provide a RESTful API to interact with the data.
The backend should be written in Node JS, and all of the testing should be done
with Chai/Mocha. See the OpenAPI definition in the repo for details about the
endpoints which should be exposed. Note: Some elements in the OpenAPI definition
will need to be filled in (host, basePath, operationIds).


## Frontend

The frontend will allow Dr. Ford the ability to perform the following actions.

* Add new robots
* View details for existing entries
* Modify details for existing entries
* Delete existing entry

The frontend should be written as a single page application in JavaScript with
the React framework. All of the testing should be written using Jest/Enzyme.


## Continuous Integration

Circle CI should be used to automate testing of the code base.


## Vagrant

Included in the repo is a basic Vagrantfile. Your app should run in the Vagrant
VM with instructions on how to get it to work (if it's not automated by the
Vagrantfile). If you've never used Vagrant, you can get information about how
to get started [here](https://www.vagrantup.com/intro/getting-started/).
