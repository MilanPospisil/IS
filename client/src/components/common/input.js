import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ClientFunc from '../../clientFunc.js';

function Input(props) {
    var type = props.type;
    if (!type) type = 'text';

    function change_value(event)
    {
        props.set(event.target.value);
    }

    return (
       <input type={type} value={props.value} onChange={change_value}></input>
    );
}

export default Input;

