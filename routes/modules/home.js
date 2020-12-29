
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// require data model
const restaurantList = require('../../models/restaurantModel.js')

// main page route
router.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router
