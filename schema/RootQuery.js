const graphql = require('graphql')
const userType = require('./types/userType')
const mongoose = require('mongoose')
const User = require('../models/User.js')

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: userType,
      args: { id: { type: GraphQLString}},

      resolve(parent, { id }) {
        return User.findById(id)
          .then(user => user)
          .catch(err => console.log(err))
      }
    },

    getAllUsers: {
      type: new GraphQLList(userType),
      resolve(parent, args, req){
        return User.find({})
      }
    }
  }
})

module.exports = RootQuery