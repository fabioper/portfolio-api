const router = require('express').Router()
const bodyParser = require('body-parser')
const { ObjectID, MongoClient } = require('mongodb')
const assert = require('assert')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

MongoClient.connect(process.env.MONGO_URI, (err, db) => {
    assert.equal(err, null)
    console.log('Successfully connected to MongoDB')

    router.route('/')
        .get((req, res) => {
            const projection = {}

            if (req.query.filter) {
                const filter = req.query.filter.split(',')
                filter.forEach(field => { projection[field] = 1 })
            }

            const cursor = db.collection('projects').find()
            cursor.limit(6)
            cursor.sort({ uploaded_at: -1 })
            cursor.project(projection)

            cursor.toArray((err, projects) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        error: err.message
                    })
                }

                return res.json(projects)
            })
        })
        .post((req, res) => {
            const project = req.body
            project.uploaded_at = new Date()

            db.collection('projects').insertOne(project, (err, results) => {
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        error: err.message
                    })
                }

                return res.status(201).redirect(`/api/projects/${ results.insertedId }`)
            })
        })

    router.route('/:id')
        .all((req, res, next) => {
            const id = new ObjectID(req.params.id)
            req.id = { _id: id }

            next()
        })
        .get((req, res) => {
            const cursor = db.collection('projects').find(req.id)
            cursor.limit(1)

            cursor.next((err, project) => {
                if (err) {
                    return res.status(400).json({ status: 400, error: err.message })
                }

                if (!project) {
                    return res.status(404).json({ status: 404, error: 'No project was found' })
                }

                return res.json(project)
            })
        })
        .put((req, res) => {
            const update = { $set: req.body }
            const options = { returnOriginal: false }

            db.collection('projects').findOneAndUpdate(req.id, update, options, (err, results) => {
                if (err) {
                    return res.status(400).json({ status: 400, error: err.message })
                }

                return res.redirect(`/api/projects/${ results.value._id }`)
            })
        })
        .delete((req, res) => {
            db.collection('projects').findOneAndDelete(req.id, err => {
                if (err) {
                    return res.status(400).json({ status: 400, error: err.message })
                }

                return res.json({
                    status: 200,
                    message: 'Project successfully removed'
                })
            })
        })
})

module.exports = router
