const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const saltRound = 10;
const passport = require('passport')

module.exports = (app) => {

  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
      return next()
    }

    res.redirect('/api/login')
  }

  const loggedOut = (req, res, next) => {
    if (req.isUnauthenticate()) {
      return next()
    } else {
      res.redirect('/')
    }

  }

  app.get('/api/currentUser', isLoggedIn, (req, res) => {
    res.send(req.user)

  })

  app.get('/api/login', (req, res) => {
    res.send(req.flash())
  })

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })


  app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/login',
    failureFlash: true
  }))



}

