const bodyParser = require('body-parser')
const router = require('express').Router()
const projectsController = require('../controllers/projects.controller')
const verifyUser = require('../helpers/verifyUser')

const jsonParser = bodyParser.json()

router.get('/', projectsController.index)
router.post('/', verifyUser, jsonParser, projectsController.create)
router.get('/:id', projectsController.show)
router.patch('/:id', verifyUser, jsonParser, projectsController.edit)
router.delete('/:id', verifyUser, projectsController.destroy)

module.exports = router
