const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server.js');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API-ROUTES', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
        .then(() => {
          database.seed.run()
        })
        .then(() => {
          done()
        })
      })
    })

  describe('GET /api/v1/robots', () => {
    it('should get all the robots', () => {
      return chai.request(server)
        .get('/api/v1/robots')
          .then(response => {
            response.should.be.json;
            response.should.have.status(200);
            response.body.should.be.an('array');
            response.body[0].should.have.property('id');
            response.body[0].id.should.equal(1);
            response.body[0].should.have.property('date_added');
            response.body[0].date_added.should.equal('12/02/1982');
            response.body[0].should.have.property('first_active');
            response.body[0].first_active.should.equal('05/07/2018');
            response.body[0].should.have.property('current_name');
            response.body[0].current_name.should.equal('Esteban');
            response.body[0].should.have.property('height');
            response.body[0].height.should.equal('56 in');
            response.body[0].should.have.property('weight');
            response.body[0].weight.should.equal('120 lbs');
            response.body[0].should.have.property('intelligence_metric');
            response.body[0].intelligence_metric.should.equal(5)
          })
          .catch(error => {
            throw error
          })
    })
  })

  describe('POST /api/v1/robots', () => {
    it('should post a new robot to db', () => {
      return chai.request(server)
        .post('/api/v1/robots')
        .send({
          date_added: "11/24/1898",
          first_active: "08/10/1900",
          current_name: "Jakkus",
          height: "156 in",
          weight: "520 lbs",
          intelligence_metric: 1
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
        })
        .catch(error => {
          throw error;
        })
    })
  })
})
