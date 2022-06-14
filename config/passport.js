const { model } = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')

module.exports = app => {
  // initialize passport
  app.use(passport.initialize())
  app.use(passport.session())
  // Strategies
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false, req.flash('faillogin_msg', 'The email is not registered.'))
        if (user.password !== password) return done(null, false, req.flash('faillogin_msg', 'Email or Password incorrect.'))
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        User.create({
          name,
          email,
          password: randomPassword
        })
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
      .catch(err => done(err, false))    
  }));
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        User.create({
          name,
          email,
          password: randomPassword
        })
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
      .catch(err => done(err, false))    
  }));
  // Serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}