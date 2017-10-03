const router = require('express').Router()
require('../db')

router.use('/projects', require('./projects'))
router.use('/', require('./users'))

module.exports = router
