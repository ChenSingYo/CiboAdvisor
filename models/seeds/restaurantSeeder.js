const restaurantModel = require('../restaurantModel') // import restaurantModel.js
const restaurantList = require('./restaurant.json') // import seed data

const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < restaurantList.results.length; i++) {
    restaurantModel.create(restaurantList.results[i])
  }
  console.log('done')
})
