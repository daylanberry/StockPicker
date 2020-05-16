import React, {useState} from 'react';
import './App.css';
import axios from 'axios'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { graphql } from 'react-apollo'

const USER = gql`
  query {

    currentUser {
      name
      id
      email
    }
  }
`

const login = gql`
  mutation {
    login(email: "test@gmail.com", password: "1234") {
      name
      email
      id
    }
  }
`

function App(props) {

  const { loading, error, data } = useQuery(USER)

  const getUser = () => {
    // axios.get('/api/currentUser')
    //   .then(res => console.log(res.data))
  }

  return (
    <div className="App">
      <a href='auth/google' onClick={getUser}>google</a>
      <button onClick={() => console.log(data)}>data</button>
    </div>
  );
}

export default graphql(USER)(graphql(login)(App));
