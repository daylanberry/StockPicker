import React, { useEffect } from 'react'
import CURRENT_USER from '../queries/currentUser'
import { useQuery } from '@apollo/react-hooks'

import { useApolloClient } from "@apollo/react-hooks";

const Home = props => {

  // const client = useApolloClient()

  // const t = client.readQuery({
  //   query: CURRENT_USER
  // })
  // console.log('t', t)

  return(
    <div>
      Home!
    </div>
  )

}

export default Home
