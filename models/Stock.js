const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StockSchema = new Schema({
  name: String,
  ticker: String,
  price: Number,
  qty: Number,
  currentPrice: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Stock = mongoose.model('Stock', StockSchema)

module.exports = Stock