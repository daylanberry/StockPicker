const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../keys/keys.js')

const passport = require('passport')
const User = require('../models/User.js')

passport.serializeUser((user, cb) => {

  cb(null, user)
})

passport.deserializeUser((userObj, cb) => {
  cb(null, userObj)
})


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecretKey,
    callbackURL: "/auth/google/callback",
    proxy: true
  },

  (accessToken, refreshToken, profile, done) => {

    User.findOne({
        googleId: profile.id
      })
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

const googleSignIn = (req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('google', (err, user) => {
      if(!user || err) {
        reject('Something Went Wrong')
      } else {
        req.login(user, () => resolve(user))
        .catch(err => err)
      }
    })
  })
}




passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err)
    }

    if (String(user._id) !== String(user.googleId)) {
      return done(null, false)
    }

    const match = user.validPassword(password, user.password)

    if (match) {
      return done(null, user)
    } else {
      return done(null, false, 'Invalid Credentials!')
    }
  })
}))

var login = ({ email, password, req }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid credentials!')
      } else {
        req.login(user, () => resolve(user))
      }
    })({ body: { email, password }})
  })
}

var signUp = ({ name, email, password }, req) => {
  const newUser = new User({
    email,
    password,
    name,
    avalBalance: 0,
    assets: 0
  })
  newUser.googleId = newUser._id
  if (!email || !password) {
    throw new Error('You must provide an email and password!')
  }

  return User.findOne({email})
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email in use!')
      }

      return newUser.save()
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) {
            reject(err)
          }
          resolve(user)
        })
      })
    })

}

module.exports = { login, googleSignIn, signUp }
