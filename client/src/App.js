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
        .catch(function (error) {
          ClientFunc.log(error);
        });
    },
    [user]);

  return (
    <div className="App">
      <header className="App-header">
        <Login user={user} user_name={user_name} set_user={set_user}></Login>
      </header>
    </div>
  );
}

export default App;
