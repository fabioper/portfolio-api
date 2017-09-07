const bodyParser = require('body-parser')
const router = require('express').Router()
const projectsController = require('../controllers/projects_controller')

const jsonParser = bodyParser.json()

router.get('/', projectsController.index)
router.post('/', jsonParser, projectsController.create)
router.patch('/:id', jsonParser, projectsController.edit)
router.delete('/:id', projectsController.destroy)
router.get('/:id', projectsController.show)

module.exports = router
