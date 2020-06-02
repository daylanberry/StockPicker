const graphql = require('graphql')
const userType = require('./types/userType')
const axios = require('axios')
const { login, googleSignIn, signUp } = require('./strategies.js')

const { GraphQLObjectType, GraphQLString } = graphql


const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    logout: {
      type: userType,
      resolve(parent, args, req) {
        var { user } = req
        req.logout()
        return user
      }
    },
    login: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },

      resolve(parent, {email, password}, req) {
        return login({email, password, req})
      }
    },

    signup: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, {name, email, password}, req){
        return signUp({name, email, password}, req)
          .catch(err => err)
      }
    },
    test: {
      type: userType,
      resolve(parent, args, req){
        console.log(req.user)
      }
    }

  }
})

module.exports = Mutations