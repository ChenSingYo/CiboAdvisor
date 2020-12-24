const mongoose = require('mongoose')
const restaurantModel = require('../restaurantModel') // import restaurantModel.js
const restaurantList = require('./restaurant.json') // import seed data

mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.results.length; i++) {
    restaurantModel.create(restaurantList.results[i])
  }
  console.log('done')
})
