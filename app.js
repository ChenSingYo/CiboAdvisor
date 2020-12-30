// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// import handlebars 'is' helper
const helpers = require('handlebars-helpers')()
const helperIs = helpers.is()
// import method-override
const methodOverride = require('method-override')
// import routes
const routes = require('./routes')

// setting template engine and handlebars-helpers
app.engine('handlebars', exphbs({ helpers: helperIs, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

require('./config/mongoose')

// use epxress-urlencoded
app.use(express.urlencoded({ extended: true }))

// use method-override
app.use(methodOverride('_method'))

// pet requests into routers
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
