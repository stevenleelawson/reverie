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
      })
      .then(() => {
        database.seed.run()
      })
      .then(() => {
        done()
      })
    })

  describe('GET /api/v1/robots', () => {
    it('should get all the robots', () => {
      return chai.request(server)
        .get('/api/v1/robots')
          .then(response => {
            response.should.be.json;
          })
          .catch(error => {
            throw error
          })
    })
  })
})
