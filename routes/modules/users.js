const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // MongoDB create Data and redirect to '/'
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      console.log('User already exists')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    })
    .catch(err => console.log(err))
})
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
    res.redirect('/users/login')
  })
})

module.exports = router