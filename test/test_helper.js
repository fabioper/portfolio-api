const Project = require('../models/project.model')
const User = require('../models/user.model')
const { projects } = require('./seeds/projects_seed')

beforeEach(done => {
    Promise.all([Project.remove(), User.remove()])
        .then(() => Project.insertMany(projects))
        .then(() => User.create({
            username: 'fabioz',
            password: 'beautifulpass'
        }))
        .then(() => done())
        .catch(() => done())
})
