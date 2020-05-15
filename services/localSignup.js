const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((userObj, cb) => {
  cb(null, userObj)
})



passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, email, password, done) => {

    User.findOne({email})
    .then(user => {
      if (user){
        return done(null, false, 'This email is already taken!')

      } else {
          let newUser = new User()

          newUser.email = email
          newUser.password = newUser.generateHash(password)

          newUser.save(err => {
            if (err) throw err
            return done(null, newUser)
          })
        }
      })
      .catch(err => console.log(err))
  })
)


passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, email, password, done) => {

    User.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, 'Invalid credentials')
        }

        if (!user.validPassword(password, user.password)) {
          return done(null, false, 'Oops! Wrong password!')
        }

        return done(null, user)
      })
    }
  )
);



