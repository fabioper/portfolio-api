const express = require('express')
const logger = require('morgan')
const queryParser = require('./helpers/queryParser')
const errorHandler = require('./helpers/errorHandler')

const app = express()

const port = process.env.PORT || 3001

app.set('query parser', queryParser)

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
}

app.use('/api', require('./routes'))

app.use(errorHandler)

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Express server listening on port ${port}`)
    }
})

module.exports = app
