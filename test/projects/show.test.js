const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const { projects } = require('../seeds/projects_seed')
const { ObjectId } = require('mongoose').Types

describe('GET /projects/:id', () => {
    const project = projects[0]

    it('should return an individual project', done => {
        request(app)
            .get(`/api/projects/${project._id}`)
            .expect(200)
            .then(res => {
                expect(res.body.title).to.be.equals(project.title)
                done()
            })
            .catch(done)
    })

    it('should return a 404 if project not found', done => {
        const id = new ObjectId()

        request(app)
            .get(`/api/projects/${id}`)
            .expect(404)
            .end(done)
    })

    it('should return a 404 if project id is invalid', done => {
        request(app)
            .get('/api/projects/123')
            .expect(404)
            .end(done)
    })
})
