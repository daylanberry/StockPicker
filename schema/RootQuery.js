const graphql = require('graphql')
const userType = require('./types/userType')
const newsType = require('./types/newsType')
const stockType = require('./types/stockType')
const mongoose = require('mongoose')
const User = require('../models/User.js')
const Stock = require('../models/Stock.js')
const News = require('../models/News.js')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: userType,
      resolve(parent, args, req) {
        let email = req.user ? req.user.email : null
        return User.findOne({ email })
      }
    },

    getAllUsers: {
      type: new GraphQLList(userType),
      resolve(parent, args, req){
        return User.find({})
      }
    },

    getUserStock: {
      type: new GraphQLList(stockType),
      resolve(parent, args, req) {

        return Stock.find({user: req.user._id})
          .then(stock => stock)
      }
    },

    findStock: {
      type: stockType,
      args: {
        ticker: { type: GraphQLString }
      },
      resolve(parent, { ticker }, req){
        return Stock.findOne({ticker, user: req.user._id})
      }
    },

    getNews: {
      type: new GraphQLList(newsType),
      resolve(parent, args, req) {
        return News.find({})
      }
    }
  }
})

module.exports = RootQuery