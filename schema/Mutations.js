const graphql = require('graphql')
const userType = require('./types/userType')
const stockType = require('./types/stockType')
const axios = require('axios')
const { login, googleSignIn, signUp } = require('./strategies.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Stock = mongoose.model('Stock')
const StockSchema = require('../models/Stock')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql



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
        price: { type: GraphQLFloat },
        qty: { type: GraphQLInt },
      },
      resolve(parent, { name, ticker, price, qty }, req) {

        let addedCost = Number((price * qty).toFixed(2))

        const addedStock = {name, ticker, price, qty, addedCost, user: req.user._id }

        return Stock.updateOrInsertStock(addedStock)
      }

    },

    setBalance: {
      type: userType,
      args: {
        balance: { type: GraphQLFloat }
      },
      resolve(parent, { balance }, req) {
        if (req.user) {
          return User.setBalance(req.user._id, balance)
        }
      }
    },

    updateUserAssets: {
      type: userType,
      resolve(parent, args, req) {
        return User.updateBalance(req.user._id)
      }
    },

    sellStock: {
      type: stockType,
      args: {
        ticker: { type: GraphQLString },
        qty: { type: GraphQLInt }
      },
      resolve(parent, { ticker, qty }, req){
        return Stock.sellStock(ticker, qty, req.user._id)
          .catch(err => err)
      }
    }
  }
})



module.exports = Mutations