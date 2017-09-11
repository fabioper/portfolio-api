const subdomain = require('express-subdomain')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const queryParser = require('./helpers/queryParser')
const errorHandler = require('./helpers/errorHandler')

const app = express()

app.set('query parser', queryParser)

app.use(helmet())
app.use(cors())

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
}

app.use(subdomain('api', require('./routes')))
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`Express server listening on port ${process.env.PORT}`)
    }
})

module.exports = app
