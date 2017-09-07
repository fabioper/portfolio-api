const { expect } = require('chai')
const request = require('supertest')
const { seedProject } = require('../seeds/projects_seed')
const Project = require('../../models/project')
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

    it('should respond with 400 when sending invalid data', done => {
        request(app)
            .post('/api/projects')
            .send({})
            .expect(400)
            .end(done)
    })
})
