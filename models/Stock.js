const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User.js')

const StockSchema = new Schema({
  name: String,
  ticker: String,
  costPerShare: Number,
  qty: Number,
  totalCost: Number,
  currentPrice: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

StockSchema.statics.updateOrInsertStock = async (stockObj) => {

  let stock = await Stock.findOne({
    user: stockObj.user,
    ticker: stockObj.ticker
  })

  if (!stock) {
    stockObj.costPerShare = stockObj.currentPrice = stockObj.price
    stockObj.totalCost = stockObj.addedCost

    return new Stock(stockObj).save()
  } else {
    let updatedQty = stockObj.qty + stock.qty
    let totalCost = stockObj.addedCost + stock.totalCost

    stock.qty = updatedQty
    stock.totalCost = totalCost
    stock.currentPrice = stockObj.price
    stock.costPerShare = Number((totalCost / updatedQty).toFixed(2))
    return stock.save()
  }

}

StockSchema.statics.sellStock = async (ticker, qty, userId) => {
  let stock = await Stock.findOne({ticker, user: userId})

  if (!stock) {
    throw new Error("You don't own this stock")
  }

  let updatedQty = stock.qty - qty

  if (updatedQty <= 0) {
    return Stock.deleteOne({ticker, user: userId})
  }

  stock.qty = updatedQty
  stock.totalCost = updatedQty * stock.costPerShare
  stock.costPerShare = +((stock.totalCost/updatedQty).toFixed(2))

  return stock.save()

}

const Stock = mongoose.model('Stock', StockSchema)

module.exports = Stock