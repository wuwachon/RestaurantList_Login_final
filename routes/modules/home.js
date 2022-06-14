const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find({ userId: req.user._id})
    .lean()
    .then(restaurant => {
      res.render('index', { restaurant, sort: '選擇排序方式'})
    })
    .catch(error => console.error(error))
})

module.exports = router