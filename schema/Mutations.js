const graphql = require('graphql')
const userType = require('./types/userType')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString } = graphql


const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    logout: {
      type: userType,
      resolve(parent, args, req) {
        req.logout()
      }
    },
    signUp: {
      type: userType,
      resolve(parent, args, req){

      }
    },

  }
})

module.exports = Mutations