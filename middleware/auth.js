module.exports = {
  authenticator: (req, res, next) => {
    if(req.isAuthenticated()) return next()
    req.flash('warning_msg', 'Login for checking your own list!')
    res.redirect('/users/login')
  }
}