const graphql = require('graphql')
const RootQuery = require('./RootQuery')
const Mutations = require('./Mutations')

const { GraphQLSchema } = graphql


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})

module.exports = schema