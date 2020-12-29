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

// use epxress-urlencoded
app.use(express.urlencoded({ extended: true }))

// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 引用路由器
const routes = require('./routes')
// 將 request 導入路由器
app.use(routes)

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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
