const bodyParser = require('body-parser')
const router = require('express').Router()
const projectsController = require('../controllers/projects.controller')

const jsonParser = bodyParser.json()

router.get('/', projectsController.index)
router.post('/', jsonParser, projectsController.create)
router.get('/:id', projectsController.show)
router.patch('/:id', jsonParser, projectsController.edit)
router.delete('/:id', projectsController.destroy)

module.exports = router
