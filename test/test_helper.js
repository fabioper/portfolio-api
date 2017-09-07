const Project = require('../models/project')
const { projects } = require('./seeds/projects_seed')

beforeEach(done => {
    Project.remove()
        .then(() => Project.insertMany(projects))
        .then(() => done())
        .catch(err => done())
})
