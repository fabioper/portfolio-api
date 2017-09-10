const { expect } = require('chai')
const request = require('supertest')
const { seedProject } = require('../seeds/projects_seed')
const Project = require('../../models/project.model')
const app = require('../../app')

describe('POST /projects', () => {
    it('should add a new project', done => {
        const project = seedProject(1)[0]

        request(app)
            .post('/api/projects')
            .send(project)
            .expect(302)
            .expect('Location', `/api/projects/${project._id}`)
            .then(() => Project.findById(project._id))
            .then(result => {
                expect(result.title).to.be.equals(project.title)
                done()
            })
            .catch(done)
    })

    it('should respond with 422 when sending invalid data', done => {
        request(app)
            .post('/api/projects')
            .send({})
            .expect(422)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 422)
                done()
            })
            .catch(done)
    })
})
