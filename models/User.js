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
  avalBalance: Number,
  assets: Number
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

user.statics.setBalance = async (id, balance) => {

  const user = await User.findById(id)

  let newBalance = +Number(user.avalBalance + balance).toFixed(2)
  let assetBalance = +Number(user.assets + balance).toFixed(2)
  user.avalBalance = newBalance
  user.assets = assetBalance

  return user.save()

}

user.statics.updateBalance = async (id) => {
  const userStocks = await Stock.find({user: id})

  const stockHoldings = userStocks.reduce((acc, curr) => {
    let stockAmount = +Number(curr.currentPrice * curr.qty).toFixed(2)
    acc += stockAmount
    return acc
  }, 0)


  let currentUser = await User.findById(id)

  let assets = stockHoldings + currentUser.avalBalance
  currentUser.assets = assets

  console.log(assets)

  return currentUser.save()

}


const User = mongoose.model('User', user)

module.exports = User
