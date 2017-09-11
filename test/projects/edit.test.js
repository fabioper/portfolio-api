const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const Project = require('../../models/project.model')
const { ObjectId } = require('mongoose').Types
const projectsFixt = require('../fixtures/projects.fixture')
const userFixt = require('../fixtures/users.fixture')

describe('PATCH /projects/:id', () => {
    const project = projectsFixt[0]
    let token

    beforeEach(done => {
        request(app)
            .post('/api/authenticate')
            .send(userFixt)
            .then(res => {
                token = res.body.token
                done()
            })
            .catch(done)
    })

    it('should edit an existing project', done => {
        request(app)
            .patch(`/api/projects/${project._id}`)
            .send({
                title: 'My Project'
            })
            .set('Authorization', token)
            .expect(302)
            .expect('Location', `/api/projects/${project._id}`)
            .then(() => Project.findById(project._id))
            .then(result => {
                expect(result.title).to.be.equals('My Project')
                done()
            })
            .catch(done)
    })

    it('should respond with 422 when sending invalid data', done => {
        request(app)
            .patch(`/api/projects/${project._id}`)
            .send({ title: 'VI', url: '123' })
            .set('Authorization', token)
            .expect(422)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 422)
                done()
            })
            .catch(done)
    })

    it('should respond with 404 if project id not found', done => {
        const id = new ObjectId()

        request(app)
            .patch(`/api/projects/${id}`)
            .send({})
            .set('Authorization', token)
            .expect(404)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 404)
                done()
            })
            .catch(done)
    })

    it('should respond with 404 if project id is invalid', done => {
        request(app)
            .patch('/api/projects/123')
            .send({})
            .set('Authorization', token)
            .expect(404)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 404)
                done()
            })
            .catch(done)
    })
})
