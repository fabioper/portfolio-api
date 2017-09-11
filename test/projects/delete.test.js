const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const Project = require('../../models/project.model')
const { ObjectId } = require('mongoose').Types
const projectsFixt = require('../fixtures/projects.fixture')
const userFixt = require('../fixtures/users.fixture')

describe('DELETE /projects', () => {
    const project = projectsFixt[0]
    let token

    beforeEach(done => {
        request(app)
            .post('/authenticate')
            .set('Host', 'api.localhost.dev')
            .send(userFixt)
            .then(res => {
                token = res.body.token
                done()
            })
            .catch(done)
    })

    it('should delete a project', done => {
        request(app)
            .delete(`/projects/${project._id}`)
            .set('Host', 'api.localhost.dev')
            .set('Authorization', token)
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
                expect(res.body).to.have.property('status', 200)
                expect(res.body).to.have.property('message')
                return Project.findById(project._id)
            })
            .then(project => {
                expect(project).to.not.exist
                done()
            })
            .catch(done)
    })

    it('should return 404 if project not found', done => {
        const id = new ObjectId()
        request(app)
            .delete(`/projects/${id}`)
            .set('Host', 'api.localhost.dev')
            .set('Authorization', token)
            .expect(404)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 404)
                done()
            })
            .catch(done)
    })

    it('should return 404 if object id invalid', done => {
        request(app)
            .delete('/projects/123')
            .set('Host', 'api.localhost.dev')
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
