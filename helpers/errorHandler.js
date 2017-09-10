const boom = require('boom')

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors)
        const message = {}

        errors.forEach(failedFields => {
            message[failedFields] = err.errors[failedFields].message
        })

        err = boom.create(422, 'Validation Error', { message })
    } else if (err.name === 'CastError') {
        err = boom.create(404, `${err.stringValue} is not a valid ID`)
    }

    const status = err.output.statusCode || err.output.payload.statusCode
    const message = err.data || err.output.payload.message || err.message

    res.status(status || 500).json({
        errors: { message },
        status: res.statusCode
    })
}

module.exports = errorHandler
