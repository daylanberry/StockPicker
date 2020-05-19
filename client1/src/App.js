import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'

function App(props) {

  return (
    <div className="App">
      <div className='container'>
        <Header />
        <Switch>
          <Route exact path='/signup' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
