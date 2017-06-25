const express = require('express')
const logger = require('morgan')

// Set up a new express app
const app = express()

app.use(logger('dev'))

// Set up the routes
app.use('/', require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${ process.env.PORT }`)
})
