const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
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
  const errors = []
  if (!name || !email || !password || !confirmPassword) errors.push({message: 'All form fields are required!'})
  if (password !== confirmPassword) errors.push({message: 'Password and ConfirmPassword not match!'})
  if (errors.length) return res.render('register', {
    errors,
    name,
    email,
    password,
    confirmPassword
  })
  User.findOne({ email })
    .then(user => {
      if (!user) return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
      errors.push({message: 'The email has been registered!'})
      res.render('register', {
        errors,
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
    req.flash('success_msg', 'Logout successfully!')
    res.redirect('/users/login')
  })
})

module.exports = router