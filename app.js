const express = require('express')

const port = process.env.PORT || 3000

// Set up a new express app
const app = express()

// Set up the routes
app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`Express server listening on port ${ port }`)
})
