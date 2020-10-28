import logo from './logo.svg';
import './App.css';
import ClientFunc from './clientFunc.js';
import React, { useEffect } from 'react';
import { useState } from 'react';

import Login from './components/login';


function App() {
  const [user, set_user] = useState(null);
  const [user_name, set_user_name] = useState(null);

  useEffect(
    () => {
      ClientFunc.get("/users/get_user")
      .then(function (response) {
          set_user(response.data.user);
          set_user_name(response.data.user_name);
      })
      .catch(function(error) {
         ClientFunc.log(error);
      });    
    },
    [user]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Login user={user} user_name={user_name} set_user={set_user}></Login>
    </div>
  );
}

export default App;
