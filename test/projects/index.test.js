const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')

describe('GET /projects', () => {
    it('should return all projects', done => {
        request(app)
            .get('/api/projects')
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
            .get('/api/projects?limit=2')
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
            .get('/api/projects?fields=-_id,title,description,url')
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
            .get('/api/projects?sort=title&skip=2')
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
