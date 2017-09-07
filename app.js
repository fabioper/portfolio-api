const config = require('./config').get(process.env.NODE_ENV)
const express = require('express')
const logger = require('morgan')

const app = express()

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
}

app.use('/api', require('./routes'))

app.use((error, req, res, next) => {
    let code = 500

    if (error.name === 'ValidationError') {
        code = 400
    } else if (error.name === 'CastError') {
        code = 404
    }

    res.status(code).send(error)
})

app.listen(config.PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Express server listening on port ${config.PORT}`)
    }
})

module.exports = app
