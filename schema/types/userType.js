const graphql = require('graphql')
const StockType = require('./stockType')
const mongoose = require('mongoose')
const User = require('../../models/User')

const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql

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
    avalBalance: {
      type: GraphQLFloat
    }
  }
})

module.exports = userType