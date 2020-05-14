const express = require('express')
const passport = require('passport')

module.exports = (app) => {

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'auth/google/failure',
      successRedirect: '/'
    })
  )

  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/api/signup',
    failureFlash: true
  }))

  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/signup',
    failureFlash: true
  }))

}

