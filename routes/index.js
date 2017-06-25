const router = require('express').Router()

router.use('/projects', require('./projects'))
router.use('/authentication', require('./authentication'))

module.exports = router
