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
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
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

app.put('/api/v1/robots/:id', (request, response) => {
  const robot = request.body;

  database('robots').where('id', request.params.id).update(robot, 'id')
    .then( id => {
      if (id.length) {
        response.status(201).json({ id: id[0]})
      } else {
        response.status(404).json({
          error: `the robot with the id ${request.params.id} was not found`
        })
      }
    })
    .catch( error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/robots/:id', (request, response) => {
  database('robots').where('id', request.params.id).del()
    .then( id => {
      if (id) {
        response.status(204).json({ id })
      } else {
        response.status(404).json({
          error: `Could not find robot with id ${request.params.id}`
        })
      }
    })
    .catch( error => {
      response.status(500).json({error})
    })
});

app.listen(app.get('port'), () => {
  console.log(`Reverie's backend is running on port ${app.get('port')}`)
});

module.exports = app;
