const graphql = require('graphql')
const userType = require('./types/userType')
const stockType = require('./types/stockType')
const axios = require('axios')
const { login, googleSignIn, signUp } = require('./strategies.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const StockSchema = require('../models/Stock')

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql


const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    logout: {
      type: userType,
      resolve(parent, args, req) {
        var { user } = req
        req.logout()
        return user
      }
    },
    login: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },

      resolve(parent, {email, password}, req) {
        return login({email, password, req})
      }
    },

    signup: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, {name, email, password}, req){
        return signUp({name, email, password}, req)
          .catch(err => err)
      }
    },

    addStock: {
      type: stockType,
      args: {
        name: { type: GraphQLString },
        ticker: { type: GraphQLString },
        price: { type: GraphQLInt },
        qty: { type: GraphQLInt },
        currentPrice: { type: GraphQLInt }
      },
      resolve(parent, { name, ticker, price, qty, currentPrice }, req) {
        const addedStock = {name, ticker, price, qty, currentPrice, user: req.user._id }

        User.insertStock(addedStock)
      }

    }

  }
})

module.exports = Mutations