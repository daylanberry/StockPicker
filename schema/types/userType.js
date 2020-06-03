const graphql = require('graphql')
const StockType = require('./stockType')
const mongoose = require('mongoose')
const User = require('../../models/User')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const userType = new GraphQLObjectType({
  name: 'CurrentUser',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    stocks: {
      type: GraphQLObjectType
    },
    stocks: {
      type: new GraphQLList(StockType),
      resolve(parent) {
        return User.findById(parent.id)
          .then(user => user.stocks)
      }
    }
  }
})

module.exports = userType