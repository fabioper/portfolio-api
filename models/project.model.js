const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const ProjectSchema = new Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 500,
        required: true
    },
    stack: [{
        type: String,
        maxlength: 20
    }],
    url: {
        type: String,
        validate: {
            validator: value => validator.isURL(value)
        }
    },
    lessonsLearned: [{
        type: String,
        minlength: 10,
        maxlength: 200
    }],
    images: {
        type: String,
        validate: {
            validator: value => validator.isURL(value)
        }
    }
}, {
    timestamps: true
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project
