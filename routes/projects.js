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
            const cursor = db.collection('projects').find()

            if (req.query.filter) {
                const projection = {}
                const filter = req.query.filter.split(',')

                filter.forEach(field => {
                    projection[field] = 1
                })

                cursor.project(projection)
            }

            if (req.query.skip) {
                const skip = parseInt(req.query.skip, 10)
                cursor.skip(skip)
            }

            if (req.query.limit) {
                const limit = parseInt(req.query.limit, 10)
                cursor.limit(limit)
            }

            const projectsArray = cursor.toArray()

            projectsArray
                .then(projects => res.json(projects))
                .catch(reason => res.status(500).json({
                    status: 500,
                    error: reason
                }))
        })
        .post((req, res) => {
            const project = req.body

            const insertProject = db.collection('projects').insertOne(project)

            insertProject
                .then(result => res.status(201).redirect(`/api/projects/${ result.insertedId }`))
                .catch(error => res.status(400).json({
                    status: 400,
                    error: error
                }))
        })

    router.route('/:id')
        .get((req, res) => {
            const query = {
                _id: new ObjectID(req.params.id)
            }

            const cursor = db.collection('projects').find(query)
            cursor.limit(1)

            if (req.query.filter) {
                const projection = {}
                const filter = req.query.filter.split(',')

                filter.forEach(field => {
                    projection[field] = 1
                })

                cursor.project(projection)
            }

            cursor.next((err, project) => {
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        error: err.message
                    })
                }

                if (!project) {
                    return res.status(404).json({
                        status: 404,
                        error: 'No project was found'
                    })
                }

                return res.json(project)
            })
        })
        .patch((req, res) => {
            const query = {
                _id: new ObjectID(req.params.id)
            }

            const updateProject = db.collection('projects').findOneAndUpdate(query, {
                $set: req.body
            }, {
                returnOriginal: false
            })

            updateProject.then(project => {
                res.redirect(`/api/${ project.value._id }`)
            }).catch(err => {
                res.status(400).json({
                    status: 400,
                    error: err
                })
            })
        })
        .delete((req, res) => {
            const query = {
                _id: new ObjectID(req.params.id)
            }

            const deleteProject = db.collection('projects').findOneAndDelete(query)

            deleteProject
                .then(result => {
                    res.status(200).json({
                        status: 200,
                        message: 'Project successfully deleted'
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        status: 400,
                        error: err
                    })
                })
        })
})

module.exports = router
