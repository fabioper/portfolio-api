const Project = require('../models/project')
const { projects } = require('./seeds/projects_seed')

beforeEach(done => {
    Promise.all([Project.collection.drop()])
        .then(() => Project.insertMany(projects))
        .then(() => done())
        .catch(err => done())
})
