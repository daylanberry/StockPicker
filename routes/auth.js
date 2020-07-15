const express = require('express')
const passport = require('passport')

module.exports = (app) => {

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  // app.get('/auth/google/callback',
  //   passport.authenticate('google', {
  //     failureRedirect: 'auth/google/failure',
  //     successRedirect: '/'
  //   })
  // )

  app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


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

