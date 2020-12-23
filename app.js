/* eslint-disable camelcase */

// use mongoose to connect mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// require JSON data
const restaurantList = require('./restaurant.json')

// connect to mongodb
const db = mongoose.connection
// check if get error from mongodb
db.on('error', () => {
  console.log('mongodb error!')
})
// check if connected successfully
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// main page route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// main page route after search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const getRestaurantsFromSearch = restaurantList.results.filter(({ name, name_en, category, location, description }) => {
    const searchingStr = [name, name_en, category, location, description].join('')
    return new RegExp(keyword, 'ig').test(searchingStr)
  })
  res.render('index', { restaurants: getRestaurantsFromSearch, keyword: keyword })
})

// use params to get dynamic route, pass object to show.handlebars
app.get('/restaurants/:restaurant_id', (req, res) => {
  const checkRestaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { checkRestaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
