const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  let addedCost = stockObj.price * stockObj.qty

  let stock = await Stock.findOne({
    user: stockObj.user,
    ticker: stockObj.ticker
  })

  if (!stock) {
    stockObj.costPerShare = stockObj.currentPrice = stockObj.price
    stockObj.totalCost = stockObj.addedCost

    return new Stock(stockObj).save()
  } else {
    let totalCost = addedCost + stock.totalCost
    let updatedQty = stockObj.qty + stock.qty

    stock.qty = updatedQty
    stock.totalCost = totalCost
    stock.currentPrice = stockObj.price
    stock.costPerShare = Number((totalCost / updatedQty).toFixed(2))
    return stock.save()
  }

}

const Stock = mongoose.model('Stock', StockSchema)

module.exports = Stock