const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')

describe('GET /projects', () => {
    it('should return all projects', done => {
        request(app)
            .get('/api/projects')
            .expect(200)
            .then(res => {
                expect(res.body.results).to.have.lengthOf(4)
                done()
            })
            .catch(done)
    })
})
