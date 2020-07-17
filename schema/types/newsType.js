const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt } = graphql

const newsType = new GraphQLObjectType({
  name: 'NewsInfo',
  fields: {
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    urlToImage: {
      type: GraphQLString
    },
    lastUpdated: {
      type: GraphQLString
    }
  }
})

module.exports = newsType