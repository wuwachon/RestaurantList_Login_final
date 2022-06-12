const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
  // get req.body to authenticate
})

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('register', (req, res) => {
  // MongoDB create Data and redirect to '/'
})

module.exports = router