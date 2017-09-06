const router = require('express').Router()
const projectsController = require('../controllers/projects_controller')

router.get('/', projectsController.index)

module.exports = router
