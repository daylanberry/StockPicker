const graphql = require('graphql')
const userType = require('./types/userType')
const stockType = require('./types/stockType')
const mongoose = require('mongoose')
const User = require('../models/User.js')
const Stock = require('../models/Stock.js')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: userType,
      resolve(parent, args, req) {
        console.log('hi')
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
        console.log('hello')

        return Stock.find({user: req.user._id})
          .then(stock => stock)
      }
    }
  }
})

module.exports = RootQuery