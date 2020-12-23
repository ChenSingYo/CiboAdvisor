// import mongoose to use mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('restaurant', restaurantSchema)
