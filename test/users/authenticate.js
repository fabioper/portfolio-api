const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const userFixt = require('../fixtures/users.fixture')

describe('POST /authenticate', () => {
    it('should get a token', done => {
        request(app)
            .post('/api/authenticate')
            .send(userFixt)
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
                expect(res.body).to.have.property('token').and.not.be.empty
                expect(res.body).to.have.property('status', 200)
                done()
            })
            .catch(done)
    })

    it('should respond with 401 if user data is invalid', done => {
        request(app)
            .post('/api/authenticate')
            .send({ username: 'asde', password: 'passnotvalid' })
            .expect(401)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 401)
                done()
            })
            .catch(done)
    })
})
