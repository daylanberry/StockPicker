import React, { useEffect } from 'react'
import CURRENT_USER from '../queries/currentUser'
import { useQuery } from '@apollo/react-hooks'
import {client, cache} from '../index'
import gql from 'graphql-tag'

const Home = props => {

  console.log(cache.data.data.ROOT_QUERY)

  return(
    <div>
      Home!
    </div>
  )

}

export default Home
