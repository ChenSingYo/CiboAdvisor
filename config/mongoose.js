// use mongoose to connect mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// connect to mongodb
const db = mongoose.connection

// check mongodb's status
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

module.exports = db
