const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    title: String,
    description: String,
    stack: [String],
    url: String,
    lessonsLearned: [String],
    images: [String]
}, {
    timestamps: true
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project
