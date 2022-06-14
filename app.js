// modules required
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const Restaurant = require('./models/restaurant.js')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const routes = require('./routes/index')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT
// handlebars engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// body parser use
app.use(bodyParser.urlencoded({extended: true}))
// bootstrap and other stylesheets
app.use(express.static('public'))
// RESTful tool: method-override
app.use(methodOverride('_method'))
// session use
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// passport use
usePassport(app)
// flash use
app.use(flash())
// locals middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.faillogin_msg = req.flash('faillogin_msg')
  next()
})
// routers
app.use(routes)

// port listen
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))