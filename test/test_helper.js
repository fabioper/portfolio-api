const Project = require('../models/project.model')
const User = require('../models/user.model')
const projectsFixt = require('./fixtures/projects.fixture')
const userFixt = require('./fixtures/users.fixture')

beforeEach(done => {
    Promise.all([Project.remove(), User.remove()])
        .then(() => Project.insertMany(projectsFixt))
        .then(() => User.create(userFixt))
        .then(() => done())
        .catch(done)
})
