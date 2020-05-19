const graphql = require('graphql')
const userType = require('./types/userType')
const mongoose = require('mongoose')
const User = require('../models/User.js')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: userType,
      resolve(parent, args, req) {
        let email = req.user ? req.user.email : null
        return User.findOne({ email })
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