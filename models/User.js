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

user.statics.insertStock = async (stockObj) => {
  let newQty = stockObj.qty;
  let newPrice = stockObj.price
  let addedCost = newPrice * newQty

  let stock = await Stock.findOne({user: stockObj.user, ticker: stockObj.ticker})

  if (!stock) {
    return new Stock(stockObj).save()
  } else {
    let previousCost = stock.totalCost
    let totalCost = addedCost + previousCost
    let updatedQty = newQty + stock.qty

    stock.qty = updatedQty
    stock.totalCost = totalCost
    stock.currentPrice = stockObj.price
    stock.costPerShare = totalCost/updatedQty
    return stock.save()
  }

}


module.exports = mongoose.model('User', user)
