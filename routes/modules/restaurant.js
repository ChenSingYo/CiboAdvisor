/* eslint-disable camelcase */

// require data model
const restaurantList = require('../../models/restaurantModel.js')

// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// create new data
router.get('/new', (req, res) => { return res.render('new') })

// use params to get dynamic route, pass object to show.handlebars
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const restaurant = req.body
  restaurantList.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// route to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit data
router.put('/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  restaurantList.findByIdAndUpdate(id, update, { new: true })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// delete data
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
