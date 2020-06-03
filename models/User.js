const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const StockSchema = require('./Stock.js')
const Schema = mongoose.Schema;

var user = new Schema({
  name: String,
  email: String,
  password: String,
  googleId: { type: String, unique: false },
  // stocks: [StockSchema]
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

user.statics.insertStock = (stockObj) => {
  const User = mongoose.model('User')
  const Stock = mongoose.model('Stock')
  let newStock = new Stock(stockObj).save()
    .then(stock => {
      User.findById(stockObj.user)
        .then(user => {
          user.stocks.push(stock)
          return user.save()
        })
    })
}


module.exports = mongoose.model('User', user)
