const mongoose = require('mongoose')
const Schema = mongoose.Schema
const axios = require('axios')
const keys = require('../keys/keys.js')
const dummy = require('./dummy.js')

const NewsSchema = new Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  lastUpdated: String,
})

NewsSchema.statics.updateNews = async () => {

  // const newNews = await axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${keys.newsApi}`)

  return News.deleteMany({})
    .then(() => {
      dummy.forEach(article => {
        return News.create(article)
      })
    })


}

const News = mongoose.model('News', NewsSchema)

module.exports = News