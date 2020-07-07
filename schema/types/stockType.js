const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt } = graphql


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
      type: GraphQLFloat
    },
    qty: {
      type: GraphQLInt
    },
    totalCost: {
      type: GraphQLFloat
    },
    currentPrice: {
      type: GraphQLFloat
    },
    id: {
      type: GraphQLString
    }
  }
})

module.exports = stockType