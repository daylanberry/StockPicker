import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import LoginOrSignUp from './components/LoginOrSignUp'
import Search from './components/Search'
import Performance from './components/Performance'
import AddFunds from './components/AddFunds'

function App(props) {

  return (
    <div className="App">
      <div className='container'>
        <Header />
        <Switch>
          <Route exact path='/signup' component={(props) => <LoginOrSignUp existing={false} {...props} />} />
          <Route exact path='/login' component={(props) => <LoginOrSignUp existing={true} {...props} />} />

          <Route exact path='/balance' component={AddFunds} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/performance' component={Performance} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
