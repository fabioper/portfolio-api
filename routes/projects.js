const router = require('express').Router()

router.route('/')
    .get((req, res) => {
        // Get all Projects => localhost:8000/projects
    })
    .post((req, res) => {
        // Add a new Project => localhost:8000/projects
    })

router.route('/:id')
    .get((req, res) => {
        // Get an individual Project => localhost:8000/projects/:id
    })
    .patch((req, res) => {
        // Update a Project => localhost:8000/projects/:id
    })
    .delete((req, res) => {
        // Delete a Project => localhost:8000/projects/:id
    })

module.exports = router
