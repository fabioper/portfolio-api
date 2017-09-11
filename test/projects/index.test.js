const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')

describe('GET /projects', () => {
    it('should return all projects', done => {
        request(app)
            .get('/projects')
            .set('Host', 'api.localhost.dev')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
                expect(res.body).to.have.property('status', 200)
                expect(res.body).to.have.property('count', 4)
                expect(res.body).to.have.property('results').and.have.lengthOf(res.body.count)
                done()
            })
            .catch(done)
    })

    it('should limit project results by passing "limit" query', done => {
        request(app)
            .get('/projects?limit=2')
            .set('Host', 'api.localhost.dev')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
                expect(res.body).to.have.property('status', 200)
                expect(res.body).to.have.property('count', 2)
                expect(res.body).to.have.property('results').and.have.lengthOf(res.body.count)
                done()
            })
            .catch(done)
    })

    it('should filter project results fields by passing "fields" query', done => {
        request(app)
            .get('/projects?fields=-_id,title,description,url')
            .set('Host', 'api.localhost.dev')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
                expect(res.body).to.have.property('status', 200)
                expect(res.body).to.have.property('count', 4)
                expect(res.body).to.have.property('results').and.have.lengthOf(res.body.count)
                expect(res.body.results[0]).to.have.all.keys(['title', 'description', 'url'])
                done()
            })
            .catch(done)
    })

    it('should skip project results by passing "skip" query', done => {
        request(app)
            .get('/projects?sort=title&skip=2')
            .set('Host', 'api.localhost.dev')
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('errors', null)
                expect(res.body).to.have.property('status', 200)
                expect(res.body).to.have.property('count', 2)
                expect(res.body).to.have.property('results').and.have.lengthOf(res.body.count)
                done()
            })
            .catch(done)
    })
})
