const router = require('express').Router()
const { MongoClient } = require('mongodb')
const assert = require('assert')

MongoClient.connect(process.env.MONGO_URI, (err, db) => {
    assert.equal(err, null)
    console.log('Successfully connected to MongoDB')

    router.route('/')
        .get((req, res) => {
            // Get all projects
        })
        .post((req, res) => {
            // Add a new Project
        })

    router.route('/:id')
        .get((req, res) => {
            // Get an individual Project
        })
        .patch((req, res) => {
            // Update a Project
        })
        .delete((req, res) => {
            // Delete a Project
        })
})

module.exports = router
