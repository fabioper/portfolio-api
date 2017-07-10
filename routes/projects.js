const router = require('express').Router()
const bodyParser = require('body-parser')
const Project = require('../models/project')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.route('/')
    .get()
    .post()

router.route('/:id')
    .get()
    .put()
    .delete()

module.exports = router
