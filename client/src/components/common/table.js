
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import ClientFunc from '../../clientFunc.js';

function Table(props) {

    const [data, set_data] = useState([]);
    const [metadata, set_metadata] = useState([]);
    const [query, set_query] = useState({});

    ClientFunc.entity_op(set_data, [query], true, props.entity, "get", null, "get");
    ClientFunc.entity_op(set_metadata, [query], true, props.entity, "metadata", null, "get");

    function order_by(field)
    {
        // TODO - TOHLE SE MUSI JEDNODUSE PREDELAT, POLE NENI TREBA, jen pro komunikaci se serverem
        /*if (!query.order_by) query.order_by = [];
        
        var field_plus = query.order_by.includes(field);
        var field_minus = query.order_by.includes("-"+field);

        if (!field_plus && !field.minus)
        {
            query.order_by = [];
            query.order_by.push(field);
            set_query(query);
        }else
        {
            var search = field;
            if (field_minus) search = switch_field(field);
            var replace = switch_field(search);

            var id = query.order_by.indexOf(search);
            query.order_by[id] = replace;
            set_query(query);
        }*/
        
    }

    function switch_field(field)
    {
        if (field.startsWidth("-")) return field.substring(1, field.length);
        return "-" + field;
    }

    return (
        <div className="table">
            Table!!!!
            <table>
                <tr>
                    {
                        metadata && metadata.fields ?
                            (<div className='table_header'>
                                Drawing meatadata
                                {Object.keys(metadata.fields).map((field, index) => {
                                    return (<td key={index}><a href="#"  onClick={() => order_by(field)}>{field}</a></td>);
                                })
                                }
                            </div>)
                            :
                            (<div></div>)
                    }

                    {
                        data && metadata && metadata.fields ?

                            <div className='table_row'>
                                {data.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            {Object.keys(metadata.fields).map((field, index) => {
                                                return (<td key={index}>{row[field]}</td>);
                                            })}
                                        </tr>);
                                })}
                            </div>
                            :
                            (<div></div>)
                    }

                </tr>
            </table>
        </div>
    );
}

export default Table;

