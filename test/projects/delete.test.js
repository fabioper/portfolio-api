const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const { projects } = require('../seeds/projects_seed')
const Project = require('../../models/project.model')
const { ObjectId } = require('mongoose').Types

describe('DELETE /projects', () => {
    const project = projects[0]

    it('should delete a project', done => {
        request(app)
            .delete(`/api/projects/${project._id}`)
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
            .delete(`/api/projects/${id}`)
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
            .delete('/api/projects/123')
            .expect(404)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 404)
                done()
            })
            .catch(done)
    })
})
