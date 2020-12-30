/* eslint-disable camelcase */

// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// require data model
const restaurantList = require('../../models/restaurantModel.js')

// main page route after search
router.get('/', (req, res) => {
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

// 匯出路由模組
module.exports = router
