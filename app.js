const express = require('express')
const logger = require('morgan')
const queryParser = require('./helpers/queryParser')

const app = express()

const port = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
}

app.set('query parser', queryParser)

app.use('/api', require('./routes'))

app.use((error, req, res, next) => {
    let code = 500

    if (error.name === 'ValidationError') {
        code = 400
    } else if (error.name === 'CastError') {
        code = 404
    }

    res.status(code).json({
        error: {
            status: res.statusCode,
            message: error.message,
            type: error.name
        }
    })
})

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Express server listening on port ${port}`)
    }
})

module.exports = app
