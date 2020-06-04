const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Stock = require('./Stock.js')
const Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  email: String,
  password: String,
  googleId: { type: String, unique: false },
})



user.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

user.methods.validPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}


module.exports = mongoose.model('User', user)
