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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/v1/robots', (request, response) => {
  database('robots').select()
    .then(robots => {
      response.status(200).json(robots)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.post('/api/v1/robots', (request, response) => {
  const robots = request.body;

  for (let requiredParameter of ['date_added', 'first_active', 'current_name', 'height', 'weight', 'intelligence_metric' ]) {
    if (!robots[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { date_added: <String>, first_active: <String>, current_name: <String>, height: <String>, weight: <String>, intelligence_metric: <Number>}. You are missing a ${requiredParameter} property.`
        })
    }
  }
  database('robots').insert(robots, 'id')
    .then( robot => {
      response.status(201).json({ id: robot[0] })
    })
    .catch( error => {
      response.status(500).json({error})
    })
});

app.listen(app.get('port'), () => {
  console.log(`Reverie's backend is running on port ${app.get('port')}`)
})

module.exports = app;
