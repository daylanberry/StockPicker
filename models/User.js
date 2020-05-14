const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var user = new Schema({
  googleId: String,
  username: String,
  email: String,
  password: String
})

user.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

user.methods.validPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}

module.exports = mongoose.model('User', user)
