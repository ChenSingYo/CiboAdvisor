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
// require data model
const restaurantList = require('./models/restaurantModel.js')

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
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// main page route after search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  restaurantList.find()
    .lean()
    .then(restaurants => {
      // search content by name, name_en, category, location, description
      const getRestaurantsFromSearch = restaurants.filter(({ name, name_en, category, location, description }) => {
        const searchingStr = [name, name_en, category, location, description].join('')
        return new RegExp(keyword, 'ig').test(searchingStr)
      })
      if (getRestaurantsFromSearch.length === 0) {
        res.render('notFound', { keyword: keyword })
      } else {
        res.render('index', { restaurants: getRestaurantsFromSearch, keyword: keyword })
      }
    })
    .catch(error => console.error(error))
})

// use params to get dynamic route, pass object to show.handlebars
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// route to edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit data
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  console.log(update)
  restaurantList.findByIdAndUpdate(id, update, { new: true })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
