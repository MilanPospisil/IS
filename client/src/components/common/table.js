
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ClientFunc from '../../clientFunc.js';

function Table(props) {
  
    const [data, set_data] = useState([]);
    const [metadata, set_metadata] = useState([]);
    
    ClientFunc.entity_op(set_data, [], true, props.entity, "get", null, "get");
    ClientFunc.entity_op(set_metadata, [], true, props.entity, "metadata", null, "get");

    return (
        <div className="table">
            Table!!!!
            <table>
            <tr>
            {
                metadata && metadata.fields ?
                (<div>
                    Drawing meatadata
                    {Object.keys(metadata.fields).map((field, index) =>
                        {
                            return (<td key={index}>{field}</td>);        
                        })
                    }
                </div>)
                :
                (<div></div>)
            }
            </tr>
            </table>
        </div>
    );
}

export default Table;
  
  