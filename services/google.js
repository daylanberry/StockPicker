const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const keys = require('../keys/keys.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecretKey,
    callbackURL: "/auth/google/callback",
    proxy: true
  },

  (accessToken, refreshToken, profile, done) => {
    console.log('hii')
    User.findOne({googleId: profile.id})
      .then(user => {
        if (!user) {
          var currentUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
            avalBalance: 0,
            assets: 0
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

// passport.serializeUser((user, cb) => {

//   cb(null, user)
// })

// passport.deserializeUser((userObj, cb) => {
//   cb(null, userObj)
// })
