import React, {useState} from 'react';
import './App.css';
import axios from 'axios'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { graphql } from 'react-apollo'

const USER = gql`
  query {

    currentUser {
      id
      name
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

  console.log(data)

  return (
    <div className="App">
      <a href='auth/google'>google</a>
      <button onClick={() => console.log(data)}>data</button>
    </div>
  );
}

export default graphql(USER)(graphql(login)(App));
