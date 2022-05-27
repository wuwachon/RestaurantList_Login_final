const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword || ''
  return Restaurant.find({ 
    $or: [
      {name: {$regex: keyword, $options: 'i'}},
      {category: {$regex: keyword, $options: 'i'}}
    ]
  })
    .lean()
    .then(restaurant => {
      if (!keyword || keyword.trim() === '') return res.redirect('/')
      res.render('index', { restaurant , keyword, sort: '選擇排序方式' })
    })
    .catch(error => console.log(error))
})
// sort function
router.post('/sort', (req, res) => {
  const sortKey = req.body.sort || 'name'
  const sort = {
    'name': 'A->Z',
    '-name': 'Z->A',
    'category': '類型',
    'location': '地區'
  }
  return Restaurant.find()
    .lean()
    .sort(sortKey)
    .then(restaurant => {
      res.render('index', { restaurant , sort: sort[sortKey]})
    })
    .catch(error => console.log(error))
})
// create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// read the detail of restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', {restaurant}))
    .catch(error => console.log(error))
})
// update a restaurant information
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// delete a restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router