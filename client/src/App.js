import logo from './logo.svg';
import './App.css';
import ClientFunc from './clientFunc.js';
import React, { useEffect } from 'react';
import { useState } from 'react';

import Login from './components/login';
import Item_types from './components/item_types';


function App() {
  const [user, set_user] = useState(null);
  const [user_name, set_user_name] = useState(null);
  const [role, set_role] = useState(null);


  useEffect(
    () => {
      ClientFunc.get("/users/get_user")
        .then(function (response) {
          set_user(response.data.user);
          set_user_name(response.data.user_name);
          set_role(response.data.role);
        })
        .catch(function (error) {
          ClientFunc.log(error);
        });
    },
    [user]);

  return (
    <div className="App">
      <header className="App-header">
        <Login user={user} user_name={user_name} role={role} set_user={set_user} set_role={set_role} set_user_name={set_user_name}></Login>
      </header>
      <Item_types></Item_types>
    </div>
  );
}

export default App;
