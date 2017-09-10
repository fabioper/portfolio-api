const router = require('express').Router()
const db = require('../db')

router.use('/projects', require('./projects'))
router.use('/admin', require('./users'))

module.exports = router
