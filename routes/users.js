const router = require('express').Router()
const bodyParser = require('body-parser')
const UsersController = require('../controllers/users.controller')

const jsonParser = bodyParser.json()

router.post('/signup', jsonParser, UsersController.signup)
router.post('/authenticate', jsonParser, UsersController.auth)

module.exports = router
