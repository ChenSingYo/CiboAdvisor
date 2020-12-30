// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)

const restaurant = require('./modules/restaurant')
router.use('/restaurants', restaurant)

const search = require('./modules/search')
router.use('/search', search)

const sort = require('./modules/sort')
router.use('/sort', sort)

// 匯出路由器
module.exports = router
