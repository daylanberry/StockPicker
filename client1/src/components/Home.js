import React, { useEffect } from 'react'
import CURRENT_USER from '../queries/currentUser'
import { useQuery } from '@apollo/react-hooks'
import {client} from '../index'
import gql from 'graphql-tag'

const Home = props => {

  client.query({query: CURRENT_USER})
    .then(user => console.log(user))

  return(
    <div>
      Home!
    </div>
  )

}

export default Home