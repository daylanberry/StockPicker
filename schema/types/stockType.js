const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql


const stockType = new GraphQLObjectType({
  name: 'StockInfo',
  fields: {
    name: {
      type: GraphQLString
    },
    ticker: {
      type: GraphQLString
    },
    costPerShare: {
      type: GraphQLInt
    },
    qty: {
      type: GraphQLInt
    },
    totalCost: {
      type: GraphQLInt
    },
    currentPrice: {
      type: GraphQLInt
    },

  }
})

module.exports = stockType