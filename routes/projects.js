const bodyParser = require('body-parser')
const router = require('express').Router()
const projectsController = require('../controllers/projects.controller')
const verifyUser = require('../helpers/verifyUser')

const jsonParser = bodyParser.json()

router.route('/')
    .get(projectsController.index)
    .post(verifyUser, jsonParser, projectsController.create)

router.route('/:id')
    .get(projectsController.show)
    .patch(verifyUser, jsonParser, projectsController.edit)
    .delete(verifyUser, projectsController.destroy)

module.exports = router
