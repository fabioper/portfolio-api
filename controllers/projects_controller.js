const Project = require('../models/project')

const ProjectController = {
    index(req, res, next) {
        const { sort, limit, fields, skip } = req.query

        Project.find()
            .sort(sort || {})
            .skip(skip || 0)
            .limit(limit || 0)
            .select(fields || {})
            .then(projects => {
                res.json({
                    results: projects
                })
            })
            .catch(next)
    },

    show(req, res, next) {
        const { fields } = req.query

        Project.findById(req.params.id)
            .select(fields || {})
            .then(project => {
                if (!project) {
                    return res.status(404).json('Project id not found')
                }

                res.json(project)
            })
            .catch(next)
    },

    create(req, res, next) {
        Project.create(req.body)
            .then(project => {
                res.redirect(`/api/projects/${project._id}`)
            })
            .catch(next)
    },

    edit(req, res, next) {
        const id = req.params.id
        const body = req.body
        const opts = { new: true, runValidators: true }

        Project.findByIdAndUpdate(id, body, opts)
            .then(project => {
                if (!project) {
                    return res.status(404).send('Project id not found')
                }

                res.redirect(`/api/projects/${project._id}`)
            })
            .catch(next)
    },

    destroy(req, res, next) {
        const id = req.params.id
        const opts = { select: '_id' }

        Project.findByIdAndRemove(id, opts)
            .then(project => {
                if (!project) {
                    return res.status(404).send('Project id not found')
                }

                res.json({
                    message: `Project ${project._id} successfully deleted.`
                })
            })
            .catch(next)
    }
}

module.exports = ProjectController
