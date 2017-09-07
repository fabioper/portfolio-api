const bodyParser = require('body-parser')
const router = require('express').Router()
const projectsController = require('../controllers/projects_controller')
const queryParser = require('../helpers/parseQuery')

const jsonParser = bodyParser.json()

router.get('/', queryParser, projectsController.index)
router.post('/', jsonParser, projectsController.create)
router.patch('/:id', jsonParser, projectsController.edit)
router.delete('/:id', projectsController.destroy)
router.get('/:id', queryParser, projectsController.show)

module.exports = router
