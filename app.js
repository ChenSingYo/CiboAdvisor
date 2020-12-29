/* eslint-disable camelcase */
// use mongoose to connect mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// require data model
const restaurantList = require('./models/restaurantModel.js')
// use epxress-urlencoded
app.use(express.urlencoded({ extended: true }))

// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// connect to mongodb
const db = mongoose.connection
// check mongodb's status
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

// import handlebars 'is' helper
const helpers = require('handlebars-helpers')()
const helperIs = helpers.is()

// setting template engine and handlebars-helpers
app.engine('handlebars', exphbs({ helpers: helperIs, defaultLayout: 'main' }))
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

// use params to get dynamic route, pass object to show.handlebars
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// create new data
app.get('/new', (req, res) => { return res.render('new') })

app.post('/restaurants/new', (req, res) => {
  const restaurant = req.body
  restaurantList.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
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
  restaurantList.findByIdAndUpdate(id, update, { new: true })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// delete data
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
