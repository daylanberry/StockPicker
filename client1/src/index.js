import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'
import { createNetworkInterface } from 'react-apollo'
import { ApolloProvider } from '@apollo/react-hooks'
//import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'


const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:5010/graphql',
  credentials: 'include',
  cache,
})


client.query({
  query: gql`
    {
      currentUser {
        id
        name
        email
      }
    }
  `
})
.then(res => console.log(res))
.catch(err => console.log)


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
