/* eslint-disable camelcase */

// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// require data model
const restaurantList = require('../../models/restaurantModel.js')

// main page route after search
router.get('/', (req, res) => {
  const sortBy = req.query.sort
  restaurantList.find()
    .lean()
    .sort(sortBy)
    .then(restaurants => res.render('index', { restaurants, sortBy }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
