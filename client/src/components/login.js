import React, { useState } from 'react';
import {useEffect} from 'react';

import axios from 'axios';

import _ from 'lodash';

import ClientFunc from '../clientFunc.js';

function Login(props) {
    
    let user_input       = React.createRef();
    let password_input   = React.createRef();


    // Toto je test - tady urcite,  konflikt jako prase
    // Tady budou asi konflikty
    // konflikt

    // Nejake sracky!!!!!!!


    function login(e) 
    {    
        e.preventDefault();    
        var user = user_input.current.value;
        var password = password_input.current.value;
        
        ClientFunc.post('/users/login', {
            user: user,
            password: password
          })
          .then(function (response) {
            if (response.data.success)
            {
              props.set_user(response.data.user);
            }else
            {
              props.set_user(null);
            }
          })
          .catch(function (error) {
            alert(error);
          });
    }
    
    function logout(e)
    {
        ClientFunc.post('/users/logout', {}
        )
        .then(function (response) {          
          props.set_user(null);
        })
        .catch(function (error) {
          alert(error);
        });
    }

    return (
        <div className="login">
            { props.user ? 
                <div> you are logged in as {props.user}. Welcome {props.user_name}. <a href="#" onClick={logout}>Log Out</a></div>
                :
                <table>
                        <tr><td>User name: </td><td><input  ref={user_input} type="Text" value="arkanus@seznam.cz"></input></td></tr>
                        <tr><td>Password: </td><td><input  ref={password_input} type="Text" value="Valor"></input></td></tr>
                        <tr><td><a href="#" onClick={login}>Log in</a></td><td></td></tr>
                </table>
            }
        </div>
    );
}

export default Login
