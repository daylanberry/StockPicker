import React, { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const user = () => {

    axios.get('/api/currentUser')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }


  return (
    <div className="App">
      <a href='auth/google'>google</a>
      <button onClick={user}>
        user
      </button>
    </div>
  );
}

export default App;
