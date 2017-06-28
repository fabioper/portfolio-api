const express = require('express')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))

app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${ process.env.PORT }`)
})

module.exports = app
