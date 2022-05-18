// modules required
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant.js')
const restaurant = require('./models/restaurant.js')
const app = express()
// handlebars engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
// mondoDB connect
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', () => console.log('MongiDB connect error!'))
db.once('open', () => {
  console.log('MongoDB conncted!')
})
// body parser use
app.use(bodyParser.urlencoded({extended: true}))
// bootstrap and other stylesheets
app.use(express.static('public'))
// routers
// initial page render
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})
// search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ 
    $or: [
      {name: {$regex: keyword, $options: 'i'}},
      {category: {$regex: keyword, $options: 'i'}}
    ]
  })
    .lean()
    .then(restaurant => {
      if (!keyword || keyword.trim() === '') return res.redirect('/')
      res.render('index', { restaurant, keyword })
    })
    .catch(error => console.log(error))
})
// create new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
app.post('/restaurants', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category || 'none',
    image: req.body.image || 'none',
    location: req.body.location,
    phone: req.body.phone || 'none',
    rating: req.body.rating || 'none',
    description: req.body.description
  })
  return restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// port listen
app.listen(3000, () => console.log('http://localhost:3000'))