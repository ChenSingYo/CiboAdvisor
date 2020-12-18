// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
// require JSON data
const restaurantList = require('./restaurant.json')

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
  const getRestaurantsFromSearch = restaurantList.results.filter( ({google_map,phone,...rest}) => {
    // omit google_map,phone, pick others fields in restaurant. Take only string type value in the field. combine all string[] as a long string.
    const searchingStr = Object.values(rest).filter( (value)=>typeof value === 'string' ).join('')
    // use regexp to test the keyword is exist in searchingStr( case insensitive )
    return new RegExp(keyword,'ig').test(searchingStr)
  })
  res.render('index', { restaurants: getRestaurantsFromSearch, keyword: keyword })
})

// use params to get dynamic route, pass object to show.handlebars
app.get('/restaurants/:restaurant_id', (req, res) => {
  const checkRestaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', {checkRestaurant})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
