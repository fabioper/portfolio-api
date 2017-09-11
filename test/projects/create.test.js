const { expect } = require('chai')
const request = require('supertest')
const { ObjectId } = require('mongoose').Types
const app = require('../../app')
const Project = require('../../models/project.model')
const projectsFixt = require('../fixtures/projects.fixture')
const userFixt = require('../fixtures/users.fixture')

describe('POST /projects', () => {
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

    it('should add a new project', done => {
        const project = {
            _id: new ObjectId(),
            title: 'Still Life',
            description: 'This album was the band\'s first to be recorded with Martin Mendez, who has continued to be the band\'s bass player. Although he had joined the band prior to the release of My Arms, Your Hearse, he had not contributed any bass lines to that recording. This lineup is considered to be the classic Opeth lineup.',
            url: 'https://stilllife.io',
            stack: ['MongoDB', 'Mongoose', 'React', 'Node.js'],
            lessonsLearned: [
                'Still Life is the fourth studio album from the Swedish progressive death metal band Opeth.'
            ],
            images: [
                'https://lastfm-img2.akamaized.net/i/u/770x0/4ddf6fda535343ebb3fe7fbadf92a710.jpg#4ddf6fda535343ebb3fe7fbadf92a710'
            ]
        }

        request(app)
            .post('/api/projects')
            .send(project)
            .set('Authorization', token)
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
            .set('Authorization', token)
            .expect(422)
            .then(res => {
                expect(res.body).to.have.property('errors').and.not.be.empty
                expect(res.body).to.have.property('status', 422)
                done()
            })
            .catch(done)
    })

    it('should respond with 403 if no token provided', done => {
        const project = projectsFixt[0]
        request(app)
            .post('/api/projects')
            .send(project)
            .expect(403)
            .then(() => Project.count())
            .then(count => {
                expect(count).to.be.equals(4)
                done()
            })
            .catch(done)
    })
})
