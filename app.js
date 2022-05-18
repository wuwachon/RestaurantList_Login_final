// modules required
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant.js')
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

// port listen
app.listen(3000, () => console.log('http://localhost:3000'))