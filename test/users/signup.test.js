const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const User = require('../../models/user.model')

describe('POST /signup', () => {
    it('should create a new user', done => {
        request(app)
            .post('/signup')
            .set('Host', 'api.localhost.dev')
            .send({ username: 'fabiop', password: 'mypass' })
            .expect(201)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
            })
            .then(() => User.findOne({ username: 'fabiop' }))
            .then(user => {
                expect(user).to.exist
                expect(user.admin).to.exist.and.be.false
                done()
            })
            .catch(done)
    })

    it('should respond with 422 when sending invalid data', done => {
        request(app)
            .post('/signup')
            .set('Host', 'api.localhost.dev')
            .send({ username: 'fa', password: 'asdd' })
            .expect(422)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 422)
            })
            .then(() => User.count())
            .then(count => {
                expect(count).to.be.equals(1)
                done()
            })
            .catch(done)
    })
})
