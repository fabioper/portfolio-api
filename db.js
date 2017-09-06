const config = require('./config').get(process.env.NODE_ENV)
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(config.MONGO_URI, {
    useMongoClient: true
})
