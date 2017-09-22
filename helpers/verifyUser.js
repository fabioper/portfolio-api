const jwt = require('jsonwebtoken')
const boom = require('boom')

function verifyUser(req, res, next) {
    const token = req.header('Authorization')

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return next(boom.forbidden('Invalid token'))

            if (!decoded.admin) return next(boom.forbidden('Not allowed'))

            req.user = decoded
            next()
        })
    } else {
        next(boom.forbidden('No token provided'))
    }
}

module.exports = verifyUser
