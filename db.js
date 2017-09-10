const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI

mongoose.Promise = global.Promise

mongoose.connect(mongoUri, {
    useMongoClient: true
})
