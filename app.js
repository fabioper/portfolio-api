const config = require('./config').get(process.env.NODE_ENV)
const express = require('express')
const logger = require('morgan')

const app = express()

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
}

app.use('/api', require('./routes'))

app.listen(config.PORT, () => {
    console.log(`Express server listening on port ${config.PORT}`)
})

module.exports = app
