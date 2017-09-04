const router = require('express').Router()
const db = require('../db')

router.use('/projects', require('./projects'))

module.exports = router
