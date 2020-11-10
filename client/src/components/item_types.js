import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ClientFunc from '../clientFunc.js';
import Table from './common/table.js';

function Item_types(props) {
  
    return (
        <div className="item_types">
            Item Types!!!!
            <Table entity="item_type"></Table>
        </div>
    );
}

export default Item_types;
