const boom = require('boom')

function errorHandler(err, req, res, next) {
    let error = err

    if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors)
        const message = {}

        errors.forEach(failedFields => {
            message[failedFields] = error.errors[failedFields].message
        })

        error = boom.create(422, 'Validation Error', { message })
    } else if (error.name === 'CastError') {
        error = boom.create(404, `${error.stringValue} is not a valid ID`)
    }

    const status = error.output.statusCode || error.output.payload.statusCode
    const { message } = error.data || error.output.payload || error

    res.status(status || 500).json({
        errors: message,
        status: res.statusCode
    })
}

module.exports = errorHandler
