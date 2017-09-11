const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const projectsFixt = require('../fixtures/projects.fixture')
const { ObjectId } = require('mongoose').Types

describe('GET /projects/:id', () => {
    const project = projectsFixt[0]

    it('should return an individual project', done => {
        request(app)
            .get(`/projects/${project._id}`)
            .set('Host', 'api.localhost.dev')
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
            .get(`/projects/${id}`)
            .set('Host', 'api.localhost.dev')
            .expect(404)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 404)
                done()
            })
            .catch(done)
    })

    it('should return a 404 if project id is invalid', done => {
        request(app)
            .get('/projects/123')
            .set('Host', 'api.localhost.dev')
            .expect(404)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 404)
                done()
            })
            .catch(done)
    })

    it('should filter project fields by passing "fields" query', done => {
        request(app)
            .get(`/projects/${project._id}?fields=title,url`)
            .set('Host', 'api.localhost.dev')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.all.keys(['title', 'url', '_id'])
                done()
            })
            .catch(done)
    })
})
