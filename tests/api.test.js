const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('GET /api/projects', () => {
    it('should get a JSON response', done => {
        request(app)
            .get('/api/projects')
            .expect(200)
            .expect('Content-Type', /json/, done)
    })
})
