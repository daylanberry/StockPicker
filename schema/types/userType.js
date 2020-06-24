const graphql = require('graphql')
const StockType = require('./stockType')
const mongoose = require('mongoose')
const User = require('../../models/User')

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

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
    balance: {
      type: GraphQLInt
    }
  }
})

module.exports = userType