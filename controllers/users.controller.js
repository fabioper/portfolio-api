const boom = require('boom')
const User = require('../models/user.model')

const UsersController = {
    signup(req, res, next) {
        const { username, password } = req.body

        User.create({ username, password })
            .then(() => {
                res.status(201).json({
                    errors: null,
                    status: res.statusCode,
                    message: 'User created successfully'
                })
            })
            .catch(next)
    },

    auth(req, res, next) {
        const { username, password } = req.body
        User.findOne({ username })
            .then(user => {
                if (!user || !user.comparePassword(password)) {
                    const message = 'Invalid user'
                    return next(boom.unauthorized(message))
                }
                res.json({
                    errors: null,
                    status: res.statusCode,
                    token: user.generateToken()
                })
            })
            .catch(next)
    }
}

module.exports = UsersController
