const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {

});

app.get('/api/v1/robots', (request, response) => {
  database('robots').select()
    .then(robots => {
      response.status(200).json(robots)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`Reverie's backend is running on port ${app.get('port')}`)
})

module.exports = app;
