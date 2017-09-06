const Project = require('../models/project')
const seedProject = require('./seeds/projects_seed')

beforeEach(done => {
    Promise.all([Project.collection.drop()])
        .then(() => Project.insertMany(seedProject(4)))
        .then(() => done())
        .catch(err => done())
})
