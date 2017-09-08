const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_test'

mongoose.Promise = global.Promise

mongoose.connect(mongoUri, {
    useMongoClient: true
})
