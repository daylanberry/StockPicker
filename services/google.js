const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const keys = require('../keys/keys.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleSecretKey,
  callbackURL: "/auth/google/callback"
  },

  (accessToken, refreshToken, profile, done) => {

    User.findOne({googleId: profile.id})
      .then(user => {
        if (!user) {
          var currentUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
            balance: 0
          })
          currentUser.save((err, user) => {
            return done(err, user)
          })
        } else {
          return done(null, user)
        }
      })
  }
))

passport.serializeUser((user, cb) => {

  cb(null, user)
})

passport.deserializeUser((userObj, cb) => {
  cb(null, userObj)
})
