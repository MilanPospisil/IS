import React, { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';

import _ from 'lodash';

import ClientFunc from '../clientFunc.js';

function Item_types(props) {
    const [item_types, set_item_types] = useState([]);

    ClientFunc.entity_op(set_item_types, [], true, "Item_type", "get", null, "get");
    
    return (
        <div className="item_types">
            Item Types!!!!
        </div>
    );
}

export default Item_types;
