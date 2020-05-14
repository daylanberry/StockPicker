const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, email, password, done) => {

    User.findOne({email})
    .then(user => {
      if (user){
        return done(null, false, req.flash( 'message', 'This email is already taken!'))

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
          return done(null, false, req.flash('loginMessage', 'No User Found'))
        }

        if (!user.validPassword(password, user.password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password!'))
        }

        return done(null, user)
      })
    }
  )
)



