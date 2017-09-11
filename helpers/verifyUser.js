const jwt = require('jsonwebtoken')
const boom = require('boom')

const verifyUser = function(req, res, next) {
    const token = req.header('Authorization')

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return next(boom.forbidden('Invalid token'))

            if (!decoded.admin) {
                return next(boom.forbidden('You are not allowed to do that'))
            }

            req.user = decoded
            next()
        })
    } else {
        next(boom.forbidden('You need an authorization token to access this'))
    }
}

module.exports = verifyUser