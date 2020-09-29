const express = require('express');
const passport = require('passport');

module.exports = (app) => {

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }),
    (req, res) => {
      console.log('req')
    }
  )

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'auth/google/failure',
      successRedirect: '/'
    })
  )



  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/api/login',
    failureFlash: true
  }))

  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/login',
    failureFlash: true
  }))

}

