const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  (req, email, password, done) => {

    User.findOne({email})
    .then(user => {
      if (user){

        if (user.validPassword(password, user.password)) {
          return done(null, user)
        }

        return done(null, false, {message: 'Invalid username/password'})

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
      .catch(err => done(err))
  })
)


