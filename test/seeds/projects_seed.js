const { ObjectId } = require('mongoose').Types
const faker = require('faker')

const Project = function() {
    this._id = new ObjectId()
    this.title = faker.commerce.productName()
    this.description = faker.lorem.paragraph()
    this.url = faker.internet.url()
    this.stack = []
    this.lessonsLearned = []
    this.images = []

    for (let index = 0; index < 3; index += 1) {
        this.stack.push(faker.helpers.randomize([
            'Node.js',
            'React',
            'MongoDB',
            'Python',
            'Flask',
            'Angular',
            'PostgreSQL'
        ]))
        this.lessonsLearned.push(faker.lorem.sentence(15))
        this.images.push(faker.image.business())
    }
}

const seedProject = function(times) {
    const projects = []

    for (let index = 0; index < times; index += 1) {
        projects.push(new Project())
    }

    return projects
}

const projects = seedProject(4)

module.exports = { projects, seedProject }