const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    _id: String,
    title: String,
    description: String,
    roles: [String],
    lessonsLearned: [String],
    images: [String]
}, {
    timestamps: true
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project
