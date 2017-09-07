const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
const { projects } = require('../seeds/projects_seed')
const Project = require('../../models/project')
const { ObjectId } = require('mongoose').Types

describe('PATCH /projects/:id', () => {
    const project = projects[0]

    it('should edit an existing project', done => {
        request(app)
            .patch(`/api/projects/${project._id}`)
            .send({
                title: 'My Project'
            })
            .expect(302)
            .expect('Location', `/api/projects/${project._id}`)
            .then(() => Project.findById(project._id))
            .then(result => {
                expect(result.title).to.be.equals('My Project')
                done()
            })
            .catch(done)
    })

    it('should return with 400 when sending invalid data', done => {
        request(app)
            .patch(`/api/projects/${project._id}`)
            .send({
                title: 'VI',
                url: '123'
            })
            .expect(400)
            .end(done)
    })

    it('should return 404 if project id not found', done => {
        const id = new ObjectId()

        request(app)
            .patch(`/api/projects/${id}`)
            .send({})
            .expect(404)
            .end(done)
    })

    it('should return 404 if project id is invalid', done => {
        request(app)
            .patch('/api/projects/123')
            .send({})
            .expect(404)
            .end(done)
    })
})
