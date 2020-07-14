import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-client-preset'

import CURRENT_USER from './queries/currentUser'
import 'bootstrap/dist/css/bootstrap.min.css';


export const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
})

let uri = process.env.NODE_ENV === 'production' ? 'https://stock-simu.herokuapp.com/graphql' : 'http://localhost:5010/graphql'


export const client = new ApolloClient({
  uri,
  credentials: 'include',
  cache
})


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
